import s from "./orderDetails.module.css";
import {useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../reducer/store.ts";

type OrderDetails = 'info' | 'history'

export const OrderDetails = () => {

    const [activeTab, setActiveTab] = useState<OrderDetails>('info');

    const {id} = useParams()
    const order = useAppSelector(state => state.orders.orders.find(el => el.order_id === id))
    const products = useAppSelector(state => state.orders.products.filter(obj => order?.products.includes(obj.article)))
        .map(item => item.name).join(', ');

    const status = useAppSelector(state => state.orders.order_statuses)

    const draftStatus = status.find(el => el.id === order?.status_id)?.name || ''

    const handleTabClick = (tab: OrderDetails) => {
        setActiveTab(tab);
        window.history.replaceState(null, '', `${id}?tab=${tab}`);
    };
    useLayoutEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const tabParam = searchParams.get("tab");
        if (tabParam) {
            setActiveTab(tabParam as OrderDetails);
        }
    }, []);

    return (
        <div className={s.wrapper}>
            <div className={s.menu}>
                <div className={s.menu_text}>
                    <h2>Детали заказа</h2>
                </div>
                <div className={s.menu_buttons}>
                    <button onClick={() => handleTabClick('info')}
                            className={activeTab === 'info' ? 'active' : ''}>Информация
                    </button>
                    <button onClick={() => handleTabClick('history')}
                            className={activeTab === 'history' ? 'active' : ''}>История
                    </button>
                </div>

            </div>
            <div>
                {activeTab === 'info' && (
                    <div>
                        <p>Номер заказа: {order?.order_id}</p>
                        <p>Список товаров: {products}</p>
                        <p>Дата оформления: {order?.order_date}</p>
                        <p>Хранение до: {order?.expire_date}</p>
                        <p>Статус заказа: {draftStatus}</p>
                        <p>ФИО клиента: {order?.customer_name}</p>
                        <p>Номер телефона: {order?.phone_number}</p>
                        <p>Стоимость: {order?.total_cost}</p>
                    </div>
                )}
                {activeTab === 'history' && (
                    <div>
                        <div className={s.stepProgressBar}>
                            {status.map((status) => (
                                <div key={status.id}
                                     className={`${s.step} ${status.id === order?.status_id ? s.active : ''}`}>
                                    {status.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
