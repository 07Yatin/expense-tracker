const { expenses } = require("../data/expenses");
const fs = require("fs");

function generateSummary(type) {
  const summary = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const fileName = `summary-${type}-${new Date().toISOString().split("T")[0]}.json`;
  fs.writeFileSync(fileName, JSON.stringify(summary, null, 2));
  console.log(`Summary saved to ${fileName}`);
}

module.exports = { generateSummary };