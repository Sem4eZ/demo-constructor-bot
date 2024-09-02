import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import style from './index.module.scss'

const PhoneInput = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: { chatt_id: "" },
        validationSchema: Yup.object({
            chatt_id: Yup.string()
                // .matches(/^\d{10}$/, "Введите корректный номер телефона")
                .required("Обязательное поле"),
        }),
        onSubmit: (values) => {
            onSubmit(values.chatt_id);
        },
    });

    return (
            <form onSubmit={formik.handleSubmit}>
                <div className={style.phoneInputContainer}>
                        <input
                            type="text"
                            name="chatt_id"
                            placeholder="Введите номер телефона"
                            value={formik.values.chatt_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.chatt_id && formik.errors.chatt_id ? (
                            <div>{formik.errors.chatt_id}</div>
                        ) : null}
                        <button type="submit">Отправить</button>
                </div>
            </form>
    );
};

export default PhoneInput;
