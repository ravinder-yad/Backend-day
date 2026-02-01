import { useState } from 'react';

const AddTask = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        // Parent ko data bhejo ("Dumb" component behavior)
        onAdd(title);
        setTitle('');
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
            />
            <button type="submit">Add</button>
        </form>
    );
};
export default AddTask;
