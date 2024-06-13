import {Header} from "./components/header/header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "./components/footer/footer.tsx";
import {useEffect} from "react";
import data from './data/data.json'
import {useAppDispatch} from "./reducer/store.ts";
import {setOrders} from "./reducer/ordersSlice.ts";
import s from './app.module.css'

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = () => {
            dispatch(setOrders(data));
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header/>
            <div className={s.centeredContent}>
                <div className={s.wrapper}>
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default App
