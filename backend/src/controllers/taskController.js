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
    try {

        const tasks = await Task.find({
            owner: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getTask = async (req, res) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
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