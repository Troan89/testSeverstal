import {Product} from "../../types/types.ts";
import {ChangeEvent, MouseEvent} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import s from "./products.module.css";


type Props = {
    products: Product[]
    page: number,
    rowsPerPage: number,
    handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}


export const ProductTable = ({products, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}: Props) => {
    return (
        <TableContainer component={Paper} className={s.tableContainer}>
            <Table size="small" className={s.table}>
                <TableHead className={s.tableHead}>
                    <TableRow style={{fontWeight: '700'}}>
                        <TableCell style={{width: '300px', fontWeight: '700'}} align='left'
                                   className={s.tableCall}>Наименование</TableCell>
                        <TableCell style={{width: '100px', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>Артикул</TableCell>
                        <TableCell style={{fontWeight: '700'}} align='center' className={s.tableCall}>Описание</TableCell>
                        <TableCell style={{width: '100px', fontWeight: '700'}} align='center' className={s.tableCall}>Цена</TableCell>
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