import { motion } from 'framer-motion';

const StatsCard = ({ title, count, icon, color }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between transition-colors"
        >
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{count}</h3>
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                {icon}
            </div>
        </motion.div>
    );
};

export default StatsCard;
