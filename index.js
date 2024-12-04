const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const expenseRoutes = require("./routes/expenses");
const { generateSummary } = require("./utils/summary");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use("/api", expenseRoutes);

// CRON job: Daily summary at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Generating daily summary...");
  generateSummary("daily");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
