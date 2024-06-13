import {AnyAction, combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {booksReducer} from "./booksSlice";
import {authorsReducer} from "./authorSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer =combineReducers({
    books: booksReducer,
    authors: authorsReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

// @ts-ignore
window.store = store