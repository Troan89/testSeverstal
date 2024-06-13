import s from './products.module.css'
import {ChangeEvent, MouseEvent, useState} from "react";
import {ProductTable} from "./productsTable.tsx";
import {useAppSelector} from "../../reducer/store.ts";

export const Products = () => {

    const products = useAppSelector(state=>state.orders.products)

    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(15);

    const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    return (
        <div className={s.products}>
            <div className={s.products_text}>
                <h2>Товары</h2>
            </div>
            <ProductTable products={products} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}/>
        </div>
    );
};


