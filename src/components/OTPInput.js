import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from './index.module.scss'

const OTPInput = ({ onSubmit, onResend, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onExpire();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onExpire]);

    const formik = useFormik({
        initialValues: { password: "" },
        validationSchema: Yup.object({
            password: Yup.string()
                // .matches(/^\d{6}$/, "Введите корректный одноразовый пароль")
                .required("Обязательное поле"),
        }),
        onSubmit: (values) => {
            onSubmit(values.password);
        },
    });

    return (
        <div >
            <form onSubmit={formik.handleSubmit}>
                <div className={style.phoneInputContainer}>
                    <input
                        type="text"
                        name="password"
                        placeholder="Введите одноразовый пароль"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                    ) : null}
                    <button type="submit">Подтвердить</button>
                </div>
            </form>
            {timeLeft > 0 ? (
                <div>Время жизни пароля: {timeLeft} секунд</div>
            ) : (
                <div>
                    <button onClick={onResend} className={style.resendButton}>Запросить код повторно</button>
                </div>
            )}
        </div>
    );
};

export default OTPInput;
