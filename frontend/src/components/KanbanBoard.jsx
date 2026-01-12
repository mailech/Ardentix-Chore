import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem from './TaskItem';

const columns = {
    'pending': { title: 'To Do', color: 'bg-gray-100 dark:bg-slate-800/50' },
    'in-progress': { title: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/10' },
    'completed': { title: 'Done', color: 'bg-green-50 dark:bg-green-900/10' }
};

const KanbanBoard = ({ tasks, onDragEnd, onDelete, onEdit }) => {

    const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(columns).map(([status, col]) => (
                    <div key={status} className={`rounded-xl ${col.color} p-4 min-h-[500px] border border-transparent dark:border-slate-800 transition-colors`}>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="font-bold text-gray-700 dark:text-gray-200">{col.title}</h3>
                            <span className="bg-white dark:bg-slate-800 px-2 py-1 rounded-md text-sm font-bold shadow-sm text-gray-500 dark:text-gray-400">
                                {getTasksByStatus(status).length}
                            </span>
                        </div>

                        <Droppable droppableId={status}>
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`space-y-3 transition-colors ${snapshot.isDraggingOver ? 'bg-black/5 dark:bg-white/5 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600' : ''}`}
                                >
                                    {getTasksByStatus(status).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskItem task={task} onDelete={onDelete} onEdit={onEdit} />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
