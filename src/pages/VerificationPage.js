import React, { useEffect, useState } from "react";
import PhoneInput from "../components/PhoneInput";
import OTPInput from "../components/OTPInput";
import SuccessMessage from "../components/SuccessMessage";
import { fetchResultData, sendPhoneNumber} from "../services/api";

const VerificationPage = () => {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [fetchedData, setFetchedData] = useState(null);
    const [isFail, setIsFail] = useState(false);
    const [verificationNode, setVerificationNode] = useState(null);

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
        const fetchData = async () => {
            try {
                const data = await fetchResultData(phone, otp);
                setFetchedData(data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };

        fetchData();
    };

    useEffect(() => {
        if (fetchedData) {
            const node = Object.values(fetchedData).find(node => node?.node_name === 'verification_password');
            setVerificationNode(node);
        }
    }, [fetchedData]);

    useEffect(() => {
        if (verificationNode && verificationNode.data.auth) {
            setStep(3);
        } else if (verificationNode) {
            setStep(2);
            setIsFail(true);
        }
    }, [verificationNode]);

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
                    isFail={isFail}
                />
            )}
            {step === 3 && <SuccessMessage {...verificationNode} />}
        </div>
    );
};

export default VerificationPage;
