import {Order} from "../../types/types.ts";
import {ChangeEvent, MouseEvent, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import s from "./orders.module.css";
import Up from '../../assets/up.jpg'
import Down from '../../assets/down.jpg'
import {useAppSelector} from "../../reducer/store.ts";
import {useNavigate} from "react-router-dom";
import {OrderRow} from "./orderRow/orderRow.tsx";
import {sortOrders} from "../../utils/sortOrders.ts";

type Props = {
    orders: Order[]
    page: number,
    rowsPerPage: number,
    handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}

export const OrdersTable = ({orders, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}: Props) => {

    const navigate = useNavigate()

    const ordersStatus = useAppSelector(state=>state.orders.order_statuses)
    const products = useAppSelector(state=>state.orders.products)

    const [sortedByDate, setSortedByDate] = useState<boolean | null>(null)
    const [sortedByStatus, setSortedByStatus] = useState<boolean | null>(null)
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
    const [idStatus, setIdStatus] = useState(0)
    const [sortValue, setSortValue] = useState('asc')
    const [dateSortDirection, setDateSortDirection] = useState<'asc' | 'desc'>('asc');
    const [statusSortDirection, setStatusSortDirection] = useState<'asc' | 'desc'>('asc');
    const [open, setOpen] = useState(false)

    const handleRowClick = (orderId: string) => {
        setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
        setOpen(!open)
    };
    const toggleSort = (fieldName: string) => {
        setSortedByDate(fieldName === 'order_date' ? true : null);
        setSortedByStatus(fieldName === 'status_id' ? true : null);
        setSortValue(sortValue === 'asc' ? 'desc' : 'asc');
    };
    const handleSortIconClick = (field: string) => {
        if (field === 'order_date') {
            setDateSortDirection(dateSortDirection === 'asc' ? 'desc' : 'asc');
        }
        if (field === 'status_id') {
            setStatusSortDirection(statusSortDirection === 'asc' ? 'desc' : 'asc');
        }
        toggleSort(field);
    };

    const handleNavigate = (id:string) => {
        navigate(`/orders/${id}`)
    }

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedStatusName = event.currentTarget.value;
        const selectedStatus = ordersStatus.find((s) => s.name === selectedStatusName);
        setIdStatus(selectedStatus ? selectedStatus.id : 0);
    };

    let sortedOrders = sortOrders(orders, sortedByDate, sortedByStatus, sortValue)

    if (idStatus) {
        sortedOrders = sortedOrders.filter(order=>order.status_id === idStatus)
    }

    const orderRow = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
        <OrderRow
            key={order.id}
            order={order}
            open={open}
            selectedOrderId={selectedOrderId}
            handleRowClick={handleRowClick}
            handleNavigate={handleNavigate}
            products={products}
            ordersStatus={ordersStatus}
        />
    ));

    return (
        <TableContainer component={Paper}>
            <Table size="small" className={s.table}>
                <TableHead className={s.tableHead}>
                    <TableRow>
                        <TableCell style={{width: '2%'}} align='center' className={s.tableCall}></TableCell>
                        <TableCell style={{width: '3%', fontWeight: '700'}} align='left'
                                   className={s.tableCall}>Номер заказа</TableCell>
                        <TableCell style={{width: '5%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>Количество товаров в заказе</TableCell>
                        <TableCell style={{width: '10%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>
                            Дата оформления
                            <span className={s.sortIcon} onClick={()=>handleSortIconClick('order_date')}>
                                {dateSortDirection === 'asc'
                                    ? <img src={Up} alt='' className={s.sortIconUp}/>
                                    : <img src={Down} alt='' className={s.sortIconDown}/>}
                            </span>

                        </TableCell>
                        <TableCell style={{width: '10%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>Хранение до (дата и время)</TableCell>
                        <TableCell style={{width: '10%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>
                            Статус заказа
                            <span className={s.sortIcon} onClick={()=>handleSortIconClick('status_id')}>
                                {statusSortDirection === 'asc'
                                    ? <img src={Up} alt='' className={s.sortIconUp}/>
                                    : <img src={Down} alt='' className={s.sortIconDown}/>}
                            </span>
                            <div>
                                <select name="filterStatus" onChange={handleStatusChange}>
                                    <option value="">Выберите статус</option>
                                    {ordersStatus.map((status, index) => {
                                        return (
                                            <option value={status.name} key={index}>{status.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </TableCell>
                        <TableCell style={{fontWeight: '700'}} align='center' className={s.tableCall}>ФИО
                            клиента</TableCell>
                        <TableCell style={{width: '10%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>Номер телефона</TableCell>
                        <TableCell style={{width: '8%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}>Стоимость</TableCell>
                        <TableCell style={{width: '3%', fontWeight: '700'}} align='center'
                                   className={s.tableCall}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderRow}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={sortedOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};