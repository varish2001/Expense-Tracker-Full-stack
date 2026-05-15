require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Main REST API route used by the frontend.
app.use("/api/expenses", expenseRoutes);

// Backward-compatible route in case an older frontend still calls /api/expense.
app.use("/api/expense", expenseRoutes);

app.get("/", (req, res) => {
    res.send("Expense Tracker API is running");
});

const PORT = process.env.PORT || 5000;

// Start the server only after MongoDB connects successfully.
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });
