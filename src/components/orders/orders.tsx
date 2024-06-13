import {ChangeEvent, MouseEvent, useEffect, useState} from "react";
import s from './orders.module.css'
import {OrdersTable} from "./ordersTable.tsx";
import {getOrdersSearch} from "../../selectors/getOrdersSearch.tsx";
import {CreateOrder} from "./createOrder/createOrder.tsx";

export const Orders = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search') || '';

    const orders = getOrdersSearch(searchParam)

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [search, setSearch] = useState('')

    useEffect(() => {
        setSearch(searchParam);
    }, [searchParam]);

    const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeValue = (value:string) => {
        setSearch(value);
        const urlParams = new URLSearchParams();
        if (value) {
            urlParams.set('search', value);
        }
        const newUrl = window.location.pathname + (urlParams.toString() ? `?${urlParams.toString()}` : '');
        window.history.replaceState({}, '', newUrl);
    }

    return (
        <div className={s.orders}>
            <div className={s.orders_text}>
                <h2>Заказы</h2>
                <div>
                    Поиск <input type="text" value={search} onChange={(e)=>handleChangeValue(e.currentTarget.value)}/>
                </div>
                <div>
                    <CreateOrder/>
                </div>
            </div>
            <OrdersTable orders={orders} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}/>
        </div>
    );
};
