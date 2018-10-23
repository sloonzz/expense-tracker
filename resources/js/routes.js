// import Home from "./components/general/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Welcome from "./components/main/Welcome";
import Expenses from "./components/resources/Expenses";

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
        path: "/logout",
        name: "logout",
        component: Logout
    },
    {
        path: '/expenses',
        name: "expenses",
        component: Expenses
    }
];

export default routes;
