# MERN Expense Tracker

A beginner-friendly full-stack Expense Tracker built with:

- React + Vite
- React Bootstrap
- Express
- MongoDB Atlas
- Mongoose

## Simple Project Flow

1. The user fills the expense form in the React UI.
2. `App.jsx` sends the form data to the backend using Axios.
3. Express receives the request at `/api/expenses`.
4. Mongoose saves the expense in MongoDB Atlas.
5. React updates the dashboard and expense list with the saved data.

MongoDB stores only the expenses entered by the user. There is no demo expense data.

## Run Backend

```bash
cd Backend
npm install
npm start
```

Create `Backend/.env` with:

```bash
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

## Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend uses this backend URL by default:

```bash
http://localhost:5000/api
```

## API Endpoints

- `GET /api/expenses` - fetch all expenses
- `POST /api/expenses` - add a new expense
- `PUT /api/expenses/:id` - update an expense
- `DELETE /api/expenses/:id` - delete an expense

## Main Files

- `Frontend/src/App.jsx` - main state and API flow
- `Frontend/src/Components/ExpenseForm.jsx` - add/update form
- `Frontend/src/Components/ExpenseList.jsx` - expense list with edit/delete buttons
- `Frontend/src/Components/ExpenseCard.jsx` - dashboard summary
- `Frontend/src/services/expenseApi.js` - Axios API functions
- `Backend/server.js` - Express and MongoDB setup
- `Backend/routes/expenseRoutes.js` - API routes
- `Backend/controllers/expenseController.js` - CRUD logic
- `Backend/models/Expense.js` - Mongoose schema

- ## Project Dashboard
- <img width="1237" height="682" alt="image" src="https://github.com/user-attachments/assets/4dc50fe4-fd26-4fe6-a23e-99a3f6dfe3e8" />
<img width="1257" height="694" alt="image" src="https://github.com/user-attachments/assets/895aff68-2936-4bc8-ae56-8193849641c4" />





