export type InitialState = {
	orders: Order[];
	products: Product[];
	order_statuses: Order_status[];
}
export type Order = {
	id: number;
	order_id: string;
	quantity: number;
	order_date: string;
	expire_date: string;
	status_id: number;
	customer_name: string;
	phone_number: string;
	total_cost: number;
	products: number[];
}
export type Product = {
	id: number;
	article: number;
	name: string;
	description: string;
	price: number;
}
export type Order_status = {
	id: number;
	name: string;
}