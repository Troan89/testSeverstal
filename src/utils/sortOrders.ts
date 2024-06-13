import {Order} from "../types/types.ts";

export const sortOrders = (array: Order[], sortedByDate: boolean | null, sortedByStatus: boolean | null, sortValue:string) => {
    return [...array].sort((a, b) => {
        if (sortedByDate) {
            return (sortValue === 'asc' ? 1 : -1) * (new Date(b.order_date).getTime() - new Date(a.order_date).getTime());
        } else if (sortedByStatus) {
            return (sortValue === 'asc' ? 1 : -1) * (b.status_id - a.status_id);
        } else {
            return 0; // для отсутствия сортировки
        }
    });
}