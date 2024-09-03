import React from "react";

export function SuccessMessage(node) {
    return (
        <div>
            <h2>Вы успешно верифицировали номер телефона</h2>
            <p>Статус регистрации: {`${node.data.auth}`}</p>
            <p>Контакт существует: {`${node.data.contact_indicator_exists}`}</p>
            <p>Код был использован: {`${node.data.is_used}`}</p>
            <p>Оставшееся время жизни пароля: {node.data.remaining_end_time} секунд</p>
            <img src="https://img.freepik.com/premium-photo/happy-laughing-cat-joyful-kitten_756535-5246.jpg"
                 alt="котик" width={500} height={500}/>
        </div>
    )
}

export default SuccessMessage;
