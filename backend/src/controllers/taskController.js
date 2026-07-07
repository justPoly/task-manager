const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {

        const { title, description, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Task title is required."
            });
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            owner: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getTasks = async (req, res) => {
    res.json({
        success: true,
        message: "Get Tasks Endpoint"
    });
};

const getTask = async (req, res) => {
    res.json({
        success: true,
        message: "Get Single Task Endpoint"
    });
};

const updateTask = async (req, res) => {
    res.json({
        success: true,
        message: "Update Task Endpoint"
    });
};

const deleteTask = async (req, res) => {
    res.json({
        success: true,
        message: "Delete Task Endpoint"
    });
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
};