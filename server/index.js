const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3999;

// Middleware для работы с JSON-телами запросов
app.use(cors());
app.use(express.json()); // Этот middleware позволяет парсить JSON-тела запросов

// Маршрут для получения данных от вебхука
app.post('/api/v1/webhook', (req, res) => {
    const receivedData = req.body; // Данные, отправленные сторонним сервисом
    console.log('Получены данные от вебхука:', receivedData);

    // Обработка полученных данных
    // Вы можете сохранить их, отправить на фронт или выполнить другие действия

    res.status(200).json({ message: 'Данные успешно получены' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});