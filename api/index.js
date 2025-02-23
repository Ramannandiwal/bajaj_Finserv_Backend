require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

const corsOptions = {
    origin: "*",
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    console.log("Request received:", data);

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

    
    const highestAlphabet = alphabets.length > 0
        ? alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()
        : '';

    const response = {
        is_success: true,
        user_id: process.env.USER_ID,
        email: process.env.EMAIL_ID,
        roll_number: process.env.REG_NO,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
