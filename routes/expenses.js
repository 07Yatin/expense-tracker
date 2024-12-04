const express = require("express");
const { expenses } = require("../data/expenses");

const router = express.Router();

// Add Expense
router.post("/expenses", (req, res) => {
  const { category, amount, date } = req.body;

  // Allowed categories for validation
  const allowedCategories = ["Food", "Travel", "Utilities", "Entertainment"];

  // Validate category and amount
  if (!allowedCategories.includes(category) || amount <= 0) {
    return res.status(400).json({ status: "error", error: "Invalid input" });
  }

  // Create new expense
  const expense = {
    id: Date.now(), // Unique ID based on timestamp
    category,
    amount,
    date: date || new Date().toISOString() // Default to current date if not provided
  };

  // Push the expense to the array
  expenses.push(expense);

  // Return success response
  res.json({ status: "success", data: { expenseId: expense.id } });
});

// Get Expenses
router.get("/expenses", (req, res) => {
  const { category, startDate, endDate } = req.query;
  let filteredExpenses = expenses;

  // Filter by category if provided
  if (category) filteredExpenses = filteredExpenses.filter(e => e.category === category);

  // Filter by date range if provided
  if (startDate || endDate) {
    filteredExpenses = filteredExpenses.filter(e =>
      (!startDate || new Date(e.date) >= new Date(startDate)) &&
      (!endDate || new Date(e.date) <= new Date(endDate))
    );
  }

  // Return filtered expenses
  res.json({ status: "success", data: filteredExpenses });
});

// Analyze Spending
router.get("/expenses/analysis", (req, res) => {
  // Total spending by category
  const totalByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Find the highest spending category
  const highestCategory = Object.entries(totalByCategory).reduce((max, [key, value]) => {
    return value > max.value ? { category: key, value } : max;
  }, { category: null, value: 0 });

  // Monthly spending totals
  const monthlyTotal = expenses.reduce((acc, curr) => {
    const month = new Date(curr.date).toLocaleString("default", { month: "long" });
    acc[month] = (acc[month] || 0) + curr.amount;
    return acc;
  }, {});

  // Return the analysis result
  res.json({
    status: "success",
    data: { totalByCategory, highestCategory: highestCategory.category, monthlyTotal }
  });
});


module.exports = router;