const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            <div
                className="task-status-icon"
                onClick={() => onToggle(task._id, task.isCompleted)}
            ></div>
            <span onClick={() => onToggle(task._id, task.isCompleted)}>
                {task.title}
            </span>
            <button
                onClick={() => onDelete(task._id)}
                className="delete-btn"
                aria-label="Delete task"
            >
                ✕
            </button>
        </div>
    );
};
export default TaskItem;
