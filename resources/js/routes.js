import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Welcome from "./components/main/Welcome";
import Expenses from "./components/resources/Expenses";
import Expense from "./components/resources/Expense";

const routes = [
    {
        path: "/",
        name: "welcome",
        component: Welcome
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/expenses",
        name: "expenses",
        component: Expenses
    },
    {
        path: "/expenses/:id",
        name: "expense",
        component: Expense
    }
];

export default routes;
