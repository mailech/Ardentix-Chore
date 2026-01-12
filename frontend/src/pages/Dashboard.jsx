import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import KanbanBoard from '../components/KanbanBoard';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [viewMode, setViewMode] = useState('kanban'); // 'list' or 'kanban'
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error('Error deleting task', err);
        }
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowForm(true);
    };

    const handleSave = async (taskData) => {
        try {
            if (currentTask) {
                const res = await api.put(`/tasks/${currentTask._id}`, taskData);
                setTasks(tasks.map(t => t._id === currentTask._id ? res.data : t));
            } else {
                const res = await api.post('/tasks', taskData);
                setTasks([res.data, ...tasks]);
            }
            setShowForm(false);
            setCurrentTask(null);
        } catch (err) {
            console.error('Error saving task', err);
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            // Optimistic Update
            const updatedTasks = tasks.map(t =>
                t._id === draggableId ? { ...t, status: destination.droppableId } : t
            );
            setTasks(updatedTasks);

            // API Update
            try {
                await api.put(`/tasks/${draggableId}`, { status: destination.droppableId });
            } catch (err) {
                console.error("Failed to update status", err);
                fetchTasks(); // Revert on error
            }
        }
    };

    const filteredTasks = tasks.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-300">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.username}!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-64 transition-colors"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-1 rounded-lg border border-gray-300 dark:border-slate-700 flex transition-colors">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </button>
                            <button
                                onClick={() => setViewMode('kanban')}
                                className={`p-2 rounded-md ${viewMode === 'kanban' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path></svg>
                            </button>
                        </div>

                        <button
                            onClick={() => { setCurrentTask(null); setShowForm(true); }}
                            className="btn-primary flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            New Task
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatsCard
                        title="Total Tasks"
                        count={stats.total}
                        icon={<svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>}
                        color="bg-indigo-50 dark:bg-indigo-900/20"
                    />
                    <StatsCard
                        title="In Progress"
                        count={stats.inProgress}
                        icon={<svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                        color="bg-blue-50 dark:bg-blue-900/20"
                    />
                    <StatsCard
                        title="To Do"
                        count={stats.pending}
                        icon={<svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>}
                        color="bg-gray-100 dark:bg-gray-800"
                    />
                    <StatsCard
                        title="Completed"
                        count={stats.completed}
                        icon={<svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
                        color="bg-green-50 dark:bg-green-900/20"
                    />
                </div>

                {/* Task Area */}
                {showForm && (
                    <TaskForm
                        currentTask={currentTask}
                        onSave={handleSave}
                        onCancel={() => { setShowForm(false); setCurrentTask(null); }}
                    />
                )}

                {viewMode === 'kanban' ? (
                    <KanbanBoard
                        tasks={filteredTasks}
                        onDragEnd={handleDragEnd}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400">No tasks found matching your search.</div>
                        )}
                    </div>
                )}

            </main>
        </div>
    );
};

export default Dashboard;
