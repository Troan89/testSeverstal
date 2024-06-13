import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // errorElement: <Error404/>,

        children: [
            {
                path:'/books',
                element: <div></div>
            },
        ],
    },]);