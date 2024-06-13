import {useAppSelector} from "../reducer/store.ts";

export function getOrdersSearch(search: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const s = useAppSelector(state=>state.orders)

    const newSearch = search.trim()

    let filteredEnd = s.orders.filter(order =>
        order.order_id.includes(newSearch) || order.order_id.toLowerCase().includes(newSearch.toLowerCase()))

    if (filteredEnd.length === 0) {
        filteredEnd = s.orders.filter(order =>
            order.customer_name.includes(newSearch) || order.customer_name.toLowerCase().includes(newSearch.toLowerCase()))
    }

    return filteredEnd
}