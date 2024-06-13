import {InitialState, Order} from "../types/types.ts";

const SET_DATA = 'SET_DATA'
const ADD_ORDER = 'ADD_ORDER'

type Action =
    SetData
    | AddOrder

export const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case SET_DATA:
            return{...state, orders: action.data.orders, products: action.data.products, order_statuses: action.data.order_statuses}
        case ADD_ORDER:
            return {...state, orders: [action.data, ...state.orders]}
        default:
            return state;
    }
};

export const setData = (data:InitialState) => ({
    type: SET_DATA, data
}  as const)
export const addOrder = (data:Order) => ({
    type: ADD_ORDER, data
}  as const)


export type SetData = ReturnType<typeof setData>
export type AddOrder = ReturnType<typeof addOrder>