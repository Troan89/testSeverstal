import {ChangeEvent, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../reducer/store.ts";
import {addOrder} from "../../../reducer/ordersSlice.ts";
import {v1} from "uuid";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {Product} from "../../../types/types.ts";
import {format} from 'date-fns';

const formatDate = (date: any) => {
    return format(date as Date, 'yyyy-MM-dd HH:mm:ss')
};

const validationForm = Yup.object().shape({
    order_id: Yup.string()
        .min(1, 'Минимум 1 символа')
        .required('Required'),
    order_date: Yup.date()
        .required('Required'),
    expire_date: Yup.date()
        .required('Required'),
    // status_id: Yup.number()
    //     .min(1, 'Минимум 1 символ')
    //     .required('Required'),
    customer_name: Yup.string()
        .min(5, 'Минимум 5 символов')
        .required('Required'),
    phone_number: Yup.string()
        .min(8, 'Минимум 11 символов')
        .required('Required'),
    // total_cost: Yup.number()
    //     .min(1, 'Минимум 1 символ')
    //     .required('Required'),
})

export const CreateOrder = () => {
    const dispatch = useAppDispatch()

    const products = useAppSelector(state=>state.orders.products)

    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [openSelect, setOpenSelect] = useState(false);
    const handleProductChange = (event:ChangeEvent<{ value: unknown }>) => {
        const selectedProductIds = event.target.value as number[];
        setSelectedProducts(selectedProductIds);
        formik.setFieldValue('products', selectedProductIds.join(' '));
    };

    const formik = useFormik({
        initialValues: {
            order_id: '',
            order_date: '',
            expire_date: '',
            // status_id: 1,
            customer_name: '',
            phone_number: '+7',
            products: [],
            // total_cost: 0

        },
        validationSchema: validationForm,
        onSubmit: (values) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const newProducts = values.products.split(' ').map(el=>+el)
            const newTotalCost = products
                .filter(product=> newProducts.includes(product.article))
                .reduce((acc:number, el:Product): number => acc + el.price, 0)

            dispatch(addOrder({
                id: parseInt(v1().substring(0, 8), 16),
                order_id: values.order_id,
                order_date: formatDate(values.order_date),
                expire_date: formatDate(values.expire_date),
                status_id: 1,
                customer_name: values.customer_name,
                phone_number: values.phone_number,
                products: newProducts,
                total_cost: newTotalCost,
                quantity: newProducts.length
            }))
            handleClose();
        }
    })

    const [open, setOpen] = useState(false);

     const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Добавить Заказ</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: "#f6efef",
                    p: 2,
                    width: 600,
                    padding: '20px',
                }}>
                    <form onSubmit={formik.handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <TextField label="Номер заказа" fullWidth {...formik.getFieldProps('order_id')}/>
                        {formik.errors.order_id && <div style={{color: 'red'}}>{formik.errors.order_id}</div>}
                        {/*<TextField label="Список товаров" fullWidth multiline rows={4} {...formik.getFieldProps('products')}/>*/}
                        <FormControl fullWidth>
                            <InputLabel id="select-multiple-products-label">Выберите товары</InputLabel>
                            <Select
                                labelId="select-multiple-products-label"
                                id="select-multiple-products"
                                multiple
                                value={selectedProducts}
                                onChange={handleProductChange}
                                open={openSelect}
                                // onClose={() => setOpenSelect(false)}
                                onOpen={() => setOpenSelect(true)}
                            >
                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.article}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                                <Button onClick={() => setOpenSelect(false)}>Закрыть</Button>
                            </Select>
                        </FormControl>
                        {formik.errors.products?.length === 0 && <div style={{color: 'red'}}>{formik.errors.products}</div>}
                        <TextField type='datetime-local' label="Дата оформления" fullWidth {...formik.getFieldProps('order_date')}/>
                        {formik.errors.order_date && <div style={{color: 'red'}}>{formik.errors.order_date}</div>}
                        <TextField type='datetime-local' label="Хранение до" fullWidth {...formik.getFieldProps('expire_date')}/>
                        {formik.errors.expire_date && <div style={{color: 'red'}}>{formik.errors.expire_date}</div>}
                        {/*<TextField label="Статус заказа" fullWidth {...formik.getFieldProps('status_id')}/>*/}
                        {/*{formik.errors.status_id && <div style={{color: 'red'}}>{formik.errors.status_id}</div>}*/}
                        <TextField label="ФИО клиента" fullWidth {...formik.getFieldProps('customer_name')}/>
                        {formik.errors.customer_name && <div style={{color: 'red'}}>{formik.errors.customer_name}</div>}
                        <TextField label="Номер телефона" fullWidth {...formik.getFieldProps('phone_number')}/>
                        {formik.errors.phone_number && <div style={{color: 'red'}}>{formik.errors.phone_number}</div>}
                        {/*<TextField label="Стоимость" fullWidth {...formik.getFieldProps('total_cost')}/>*/}
                        {/*{formik.errors.total_cost && <div style={{color: 'red'}}>{formik.errors.total_cost}</div>}*/}

                        <div>
                            <Button  onClick={handleClose}>Отмена</Button>
                            <Button type={'submit'}>Добавить</Button>
                        </div>
                    </form>

                </Box>
            </Modal>
        </div>
);
};
