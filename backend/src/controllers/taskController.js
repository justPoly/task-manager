const Task = require("../models/Task");

// ==============================
// Create Task
// ==============================

const createTask = async (req, res) => {
    try {

        const {
            title,
            description,
            dueDate,
            priority,
            status,
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Task title is required.",
            });
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status,
            owner: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully.",
            data: task,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==============================
// Get All Tasks
// ==============================

const getTasks = async (req, res) => {
    try {

        const { status, priority } = req.query;

        const filter = {
            owner: req.user.id,
        };

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        const tasks = await Task.find(filter).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==============================
// Get Single Task
// ==============================

const getTask = async (req, res) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: task,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==============================
// Update Task
// ==============================

const updateTask = async (req, res) => {
    try {

        const {
            title,
            description,
            dueDate,
            priority,
            status,
        } = req.body;

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (priority !== undefined) task.priority = priority;
        if (status !== undefined) task.status = status;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            data: task,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==============================
// Delete Task
// ==============================

const deleteTask = async (req, res) => {
    try {

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};