import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState, Order} from "../types/types.ts";


const initialState: InitialState = {
    orders: [],
    products: [],
    order_statuses: []
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<InitialState>){
            const { orders, products, order_statuses } = action.payload;
            state.orders = orders;
            state.products = products;
            state.order_statuses = order_statuses;
        },
        addOrder(state, action: PayloadAction<Order>){
            state.orders.unshift(action.payload)
        },
        editOrder(state, action:PayloadAction<{status_id:number, expire_date:string, id:number}>){
            const index = state.orders.findIndex(order => order.id === action.payload.id);
            if (index !== -1) {
                state.orders[index].status_id = action.payload.status_id;
                state.orders[index].expire_date = action.payload.expire_date;
            }
        }
    }
})

export const {setOrders,addOrder, editOrder} = ordersSlice.actions
export const ordersReducer = ordersSlice.reducer