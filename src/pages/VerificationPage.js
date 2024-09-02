import React, { useState } from "react";
import PhoneInput from "../components/PhoneInput";
import OTPInput from "../components/OTPInput";
import SuccessMessage from "../components/SuccessMessage";
import { sendPhoneNumber, verifyOTP } from "../services/api";

const VerificationPage = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");

    const handlePhoneSubmit = async (phone) => {
        try {
            await sendPhoneNumber(phone);
            setPhone(phone);
            setStep(2);
        } catch (error) {
            console.error("Ошибка отправки номера телефона:", error);
        }
    };

    const handleOTPSubmit = async (otp) => {
        try {
            await verifyOTP(phone, otp);
            setStep(3);
        } catch (error) {
            console.error("Неверный одноразовый пароль:", error);
        }
    };

    const handleResend = () => {
        handlePhoneSubmit(phone);
    };

    const handleExpire = () => {
        console.log("Время жизни пароля истекло");
    };

    return (
        <div>
            {step === 1 && <PhoneInput onSubmit={handlePhoneSubmit} />}
            {step === 2 && (
                <OTPInput
                    onSubmit={handleOTPSubmit}
                    onResend={handleResend}
                    onExpire={handleExpire}
                />
            )}
            {step === 3 && <SuccessMessage />}
        </div>
    );
};

export default VerificationPage;
