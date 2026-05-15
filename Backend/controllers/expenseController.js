const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({}).sort({ date: -1, createdAt: -1 });

        res.status(200).json({
            success: true,
            expenses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch expenses",
            error: error.message
        });
    }
};

const createExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const expense = await Expense.create({
            title,
            amount,
            category,
            date
        });

        res.status(201).json({
            success: true,
            expense
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to add expense",
            error: error.message
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const updatedFields = {};

        // Only update the fields sent by the frontend.
        if (title !== undefined) updatedFields.title = title;
        if (amount !== undefined) updatedFields.amount = amount;
        if (category !== undefined) updatedFields.category = category;
        if (date !== undefined) updatedFields.date = date;

        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            expense
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update expense",
            error: error.message
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to delete expense",
            error: error.message
        });
    }
};

module.exports = {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
};
