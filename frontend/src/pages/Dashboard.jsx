import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data.data);

        } catch (err) {

            setError("Unable to load tasks.");

        } finally {

            setLoading(false);

        }

    };

    if (loading)
        return <h2>Loading tasks...</h2>;

    if (error)
        return <h2>{error}</h2>;

    return (

        <div className="container">

            <h1>My Tasks</h1>

            <hr />

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

                            <strong>Status:</strong>

                            {" "}

                            {task.status}

                        </p>

                        <p>

                            <strong>Priority:</strong>

                            {" "}

                            {task.priority}

                        </p>

                        <p>

                            <strong>Due:</strong>

                            {" "}

                            {task.dueDate
                                ? new Date(
                                      task.dueDate
                                  ).toLocaleDateString()
                                : "N/A"}

                        </p>

                    </div>

                ))

            )}

        </div>

    );

}

export default Dashboard;