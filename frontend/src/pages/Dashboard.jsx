import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, } from "../services/taskService";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
    });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);

            const data = await getTasks();

            setTasks(data.data);

        } catch (err) {
            console.error(err);
            setError("Unable to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createTask(formData);

            // Reset form
            setFormData({
                title: "",
                description: "",
                dueDate: "",
                priority: "medium",
                status: "todo",
            });

            // Reload tasks
            await loadTasks();

        } catch (err) {
            console.error(err);
            alert("Unable to create task.");
        }
    };

    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;
        try {

            await deleteTask(id);

            // Refresh task list
            await loadTasks();

        } catch (error) {

            console.error(error);

            alert("Unable to delete task.");

        }

    };

    const handleEdit = (task) => {

        console.log(task);

        alert("Edit feature coming next!");

    };

    if (loading) {
        return <h2>Loading tasks...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="container">

            <h1>My Tasks</h1>

            <form onSubmit={handleSubmit} className="task-form">

                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="todo">Todo</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <button type="submit">
                    Create Task
                </button>

            </form>

            <hr />

            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} className="task-card" >
                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p>
                            <strong>Status:</strong> {task.status}
                        </p>

                        <p>
                            <strong>Priority:</strong> {task.priority}
                        </p>

                        <p>
                            <strong>Due:</strong>{" "}
                            {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "N/A"}
                        </p>

                        <div className="task-actions">

                            <button
                                className="edit-btn"
                                onClick={() => handleEdit(task)}
                            >
                                ✏️ Edit
                            </button>

                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(task._id)}
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>
                ))
            )}

        </div>
    );
}

export default Dashboard;