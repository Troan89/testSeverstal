import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {Product} from "../../types/types.ts";
import {getProducts} from "../../selectors/getProducts.tsx";
import s from './products.module.css'
import {ChangeEvent, useState, MouseEvent} from "react";

export const Products = () => {

    const orders = getProducts()

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
                <h2>Продукты</h2>
            </div>
            <ProductTable products={orders} page={page} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage}
                          handleChangeRowsPerPage={handleChangeRowsPerPage}/>
        </div>
    );
};

type Props = {
    products: Product[]
    page: number,
    rowsPerPage: number,
    handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}


const ProductTable = ({products, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}: Props) => {
    debugger
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead className={s.tableHead}>
                    <TableRow>
                        <TableCell align='left' className={s.tableCall}>Название</TableCell>
                        <TableCell align='center' className={s.tableCall}>Артикул</TableCell>
                        <TableCell align='center' className={s.tableCall}>Описание</TableCell>
                        <TableCell align='center' className={s.tableCall}>Цена</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className={s.tableCall}>{product.name}</TableCell>
                            <TableCell align='center' className={s.tableCall}>{product.article}</TableCell>
                            <TableCell align='center' className={s.tableCall}>{product.description}</TableCell>
                            <TableCell align='center' className={s.tableCall}>{product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};
