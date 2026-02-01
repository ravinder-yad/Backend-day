import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>No tasks yet. Add one above!</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
};
export default TaskList;
