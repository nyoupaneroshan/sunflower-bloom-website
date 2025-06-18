const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3010, () => {
    console.log('App running on http://localhost:3010');
});