import {Order, Order_status, Product} from "../../../types/types.ts";
import {TableCell, TableRow} from "@mui/material";
import Up from '../../../assets/up.jpg';
import Down from '../../../assets/down.jpg';
import s from "../orders.module.css";
import {EditOrder} from "../editOrder/editOrder.tsx";

type Props = {
    order: Order
    open: boolean
    selectedOrderId: string | null
    handleRowClick: (order_id: string)=> void
    handleNavigate: (order_id: string)=> void
    products: Product[]
    ordersStatus: Order_status[]
}

export const OrderRow = ({ order, open, selectedOrderId, handleRowClick, handleNavigate, products, ordersStatus }: Props) => {
    const status = ordersStatus.find(el => el.id === order?.status_id)?.name || 'Нет статуса';
    const orderProduct = products.filter(obj => order.products.includes(obj.article));

    return (
        <>
            <TableRow key={order.id}>
                <TableCell onClick={() => handleRowClick(order.order_id)} className={s.tableCall}>
                    {open && selectedOrderId === order.order_id
                        ? <img src={Up} alt='' className={s.sortIconUp}/>
                        : <img src={Down} alt='' className={s.sortIconDown}/>}
                </TableCell>
                <TableCell onClick={() => handleNavigate(order.order_id)} className={s.tableCall}>{order.order_id}</TableCell>
                <TableCell align='center' className={s.tableCall}>{order.quantity}</TableCell>
                <TableCell align='center' className={s.tableCall}>{order.order_date}</TableCell>
                <TableCell align='center' className={s.tableCall}>{order.expire_date}</TableCell>
                <TableCell align='center' className={s.tableCall}>{status}</TableCell>
                <TableCell align='center' className={s.tableCall}>{order.customer_name}</TableCell>
                <TableCell align='center' className={s.tableCall}>{order.phone_number}</TableCell>
                <TableCell align='center' className={s.tableCall}>{order.total_cost}</TableCell>
                <TableCell align='center' className={s.tableCall}>
                    <EditOrder orderId={order.id} />
                </TableCell>
            </TableRow>
            {selectedOrderId === order.order_id && (
                <>
                    <TableRow className={s.tableHead}>
                        <TableCell style={{backgroundColor: 'white'}} className={s.tableCall}
                                   rowSpan={orderProduct.length + 1}></TableCell>
                        <TableCell className={s.tableCall} align='center'>Артикул</TableCell>
                        <TableCell className={s.tableCall} colSpan={2} align='center'>Наименование</TableCell>
                        <TableCell className={s.tableCall} colSpan={3} align='center'>Описание</TableCell>
                        <TableCell className={s.tableCall} colSpan={2} align='center'>Цена</TableCell>
                        <TableCell className={s.tableCall} align='center'></TableCell>
                    </TableRow>
                    {orderProduct.map((product) => {
                        return <TableRow key={`${order.id}-details`}>
                            <TableCell align='center' className={s.tableCall}>{product.article}</TableCell>
                            <TableCell className={s.tableCall} colSpan={2}>{product.name}</TableCell>
                            <TableCell align='center' className={s.tableCall}
                                       colSpan={3}>{product.description}</TableCell>
                            <TableCell align='center' className={s.tableCall}
                                       colSpan={2}>{product.price}</TableCell>
                            <TableCell align='center' className={s.tableCall}
                            ></TableCell>
                        </TableRow>
                    })}
                </>
            )}
        </>
    );
};