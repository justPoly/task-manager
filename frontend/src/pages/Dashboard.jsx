import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTaskId, setEditingTaskId] = useState(null);

    const [filters, setFilters] = useState({
        status: "",
        priority: "",
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
    });

    useEffect(() => {
        loadTasks();
    }, [filters]);

    const loadTasks = async () => {
        try {

            setLoading(true);
            setError("");

            const data = await getTasks(filters);

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

    const handleFilterChange = (e) => {

        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });

    };

    const resetForm = () => {

        setEditingTaskId(null);

        setFormData({
            title: "",
            description: "",
            dueDate: "",
            priority: "medium",
            status: "todo",
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingTaskId) {

                await updateTask(
                    editingTaskId,
                    formData
                );

            } else {

                await createTask(formData);

            }

            resetForm();

            await loadTasks();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to save task."
            );

        }

    };

    const handleEdit = (task) => {

        setEditingTaskId(task._id);

        setFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate
                ? task.dueDate.substring(0, 10)
                : "",
            priority: task.priority,
            status: task.status,
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await deleteTask(id);

            await loadTasks();

        } catch (err) {

            console.error(err);

            alert("Unable to delete task.");

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    if (loading) {
        return <h2>Loading tasks...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (

        <div className="container">

            <div className="dashboard-header">

                <h1>My Tasks</h1>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <div className="filter-bar">

                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                >
                    <option value="">All Status</option>
                    <option value="todo">Todo</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <select
                    name="priority"
                    value={filters.priority}
                    onChange={handleFilterChange}
                >
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button
                    type="button"
                    className="clear-filter-btn"
                    onClick={() =>
                        setFilters({
                            status: "",
                            priority: "",
                        })
                    }
                >
                    Clear Filters
                </button>

            </div>

            <div className="dashboard-content">

                <div className="left-panel">

                    <form
                        onSubmit={handleSubmit}
                        className="task-form"
                    >

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
                            <option value="low">
                                Low
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="high">
                                High
                            </option>

                        </select>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="todo">
                                Todo
                            </option>

                            <option value="in progress">
                                In Progress
                            </option>

                            <option value="done">
                                Done
                            </option>

                        </select>

                        <button type="submit">

                            {editingTaskId
                                ? "Update Task"
                                : "Create Task"}

                        </button>

                        {editingTaskId && (

                            <button
                                type="button"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>

                        )}

                    </form>

                </div>

                <div className="right-panel">

                    {tasks.length === 0 ? (

                        <p>No tasks found.</p>

                    ) : (

                        tasks.map((task) => (

                            <div
                                key={task._id}
                                className="task-card"
                            >

                                <h3>{task.title}</h3>

                                <p>{task.description}</p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span className={`status ${task.status.replace(/\s+/g, "-")}`}>
                                        {task.status}
                                    </span>
                                </p>

                                <p>
                                    <strong>Priority:</strong>{" "}
                                    <span className={`priority ${task.priority}`}>
                                        {task.priority}
                                    </span>
                                </p>

                                <p>

                                    <strong>Due:</strong>{" "}

                                    {task.dueDate
                                        ? new Date(
                                              task.dueDate
                                          ).toLocaleDateString()
                                        : "N/A"}

                                </p>

                                <div className="task-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            handleEdit(task)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(task._id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}

export default Dashboard;
