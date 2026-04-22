import { motion } from 'framer-motion';

const Card = ({ title, icon: Icon, description, color }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass p-6 flex flex-col items-start gap-4 transition-all hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer group"
    >
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 ring-1 ring-inset ring-white/10 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2">{description}</p>
      </div>
      <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
        Explore More 
        <motion.span 
          animate={{ x: [0, 5, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="ml-1"
        >→</motion.span>
      </div>
    </motion.div>
  );
};

export default Card;
