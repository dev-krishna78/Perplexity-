import { createBrowserRouter } from "react-router";
import Auth from "../features/auth/pages/Auth";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected>
                      <Dashboard/>
            </Protected>
    },
    {
        path: "/login",
        element: <Auth />
    },
    {
        path: "/register",
        element: <Auth />
    },
    {
        path: "/auth",
        element: <Auth />
    }
])


