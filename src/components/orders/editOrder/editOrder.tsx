import {ChangeEvent, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../reducer/store.ts";
import {editOrder} from "../../../reducer/ordersSlice.ts";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {format} from 'date-fns';
import edit from '../../../assets/edit.png'
import s from '../orders.module.css'

const formatDate = (date: unknown) => {
    return format(date as Date, 'yyyy-MM-dd HH:mm:ss')
};

const validationForm = Yup.object().shape({
    expire_date: Yup.date()
        .required('Required'),
    status_id: Yup.number()
        .min(1, 'Минимум 1 символ')
        .required('Required'),
})

type Props = {
    orderId:number
}

export const EditOrder = ({orderId}:Props) => {

    const dispatch = useAppDispatch()

    const order = useAppSelector(state=>state.orders.orders.find(order=>order.id === orderId))
    const status = useAppSelector(state=>state.orders.order_statuses)

    let draftStatus = ''
    status.forEach(el=>el.id === order?.status_id ? draftStatus = el.name : '')

    const [selectedStatus, setSelectedStatus] = useState<string>(draftStatus);
    const [openSelect, setOpenSelect] = useState(false);

    const handleStatusChange = (event:ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setSelectedStatus(event.target.value)
            setOpenSelect(false)
            formik.setFieldValue('status_id', status.find(s => s.name === event.target.value)?.id);
        }
    };

    const formik = useFormik({
        initialValues: {
            expire_date: order?.expire_date,
            status_id: order?.status_id,
        },
        validationSchema: validationForm,
        onSubmit: (values) => {
            if (order) {
                dispatch(editOrder({
                    id: order.id,
                    expire_date: formatDate(values.expire_date),
                    status_id: values.status_id!,
                }))
            }

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
            <img src={edit} alt="" onClick={handleOpen} className={s.sortIconUp}/>
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
                    color: 'white',
                    padding: '20px',
                }}>
                    <form onSubmit={formik.handleSubmit}
                          style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <TextField type='datetime-local' label="Хранение до"
                                   fullWidth {...formik.getFieldProps('expire_date')}/>
                        {formik.errors.expire_date && <div style={{color: 'red'}}>{formik.errors.expire_date}</div>}
                        <FormControl fullWidth>
                            <InputLabel id="select-multiple-products-label">Выберите статус</InputLabel>
                            <Select
                                labelId="select-multiple-products-label"
                                id="select-multiple-products"
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                open={openSelect}
                                // onClose={() => setOpenSelect(false)}
                                onOpen={() => setOpenSelect(true)}
                            >
                                {status.map((status) => (
                                    <MenuItem key={status.id} value={status.name}>
                                        {status.name}
                                    </MenuItem>
                                ))}
                                <Button onClick={() => setOpenSelect(false)}>Закрыть</Button>
                            </Select>
                        </FormControl>
                        {formik.errors.status_id?.length === 0 && <div style={{color: 'red'}}>{formik.errors.status_id}</div>}

                        <div>
                            <Button onClick={handleClose}>Отмена</Button>
                            <Button type={'submit'}>Сохранить</Button>
                        </div>
                    </form>

                </Box>
            </Modal>
        </div>
    );
};
