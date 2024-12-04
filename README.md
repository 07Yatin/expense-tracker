# Personal Expense Tracker API - README

## Overview
The **Personal Expense Tracker API** helps users manage daily expenses, track spending patterns, and generate reports for budgeting and financial planning.

## Features
1. **Add a New Expense:** Log expenses with details like category, amount, and date.
2. **Retrieve Expense Summary:** Get a summary filtered by category or date range.
3. **Analyze Spending Patterns:** Identify the highest spending categories or monthly totals.
4. **Generate Reports:** Create weekly or monthly reports summarizing expenses.

## API Endpoints

- **POST /expenses**: Add a new expense.
  - Request body: `{"category": "Food", "amount": 50.00, "date": "2024-12-04"}`
  
- **GET /expenses/summary**: Get expense summary by category or date range.
  - Example: `GET /expenses/summary?category=Food&start_date=2024-01-01&end_date=2024-12-31`

- **GET /expenses/analytics**: Analyze spending trends and patterns.

- **GET /expenses/report**: Generate weekly or monthly reports.
  - Example: `GET /expenses/report?period=monthly&month=December`

## Authentication
OAuth2 authentication is required. Include the token in the request header:
```bash
Authorization: Bearer <your-access-token>
```

## Installation
1. Clone the repo: `git clone https://github.com/yourusername/expense-tracker-api.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## License
MIT License.# expense-tracker
