const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0.01, "Amount must be greater than 0"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        lowercase: true
    }, 
    date: {
        type: Date,
        required: [true, "Date is required"]
    } 
}, {
    timestamps: true
});

module.exports = mongoose.model("Expense", expenseSchema);
