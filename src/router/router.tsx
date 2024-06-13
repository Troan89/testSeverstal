import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import {Products} from "../components/products/products.tsx";
import {Orders} from "../components/orders/orders.tsx";
import {OrderDetails} from "../components/orders/orderDetails/orderDetails.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // errorElement: <Error404/>,

        children: [
            {
                path:'/orders',
                element: <Orders />
            },
            {
                path:'/orders/:id',
                element: <OrderDetails />
            },
            {
                path:'/products',
                element: <Products />
            },
        ],
    },]);