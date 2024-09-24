const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/authorize', (req, res) => {
    const trelloAuthUrl = 'https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=24dae7ea7be0b916f47975a8e2316242&return_url=https://express-trello.onrender.com/callback';
    res.redirect(trelloAuthUrl);
});

app.get('/callback', (req, res) => {
    const token = req.query.token;

    const tokenData = { token: token };
    console.log(tokenData);
    res.json(tokenData);
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
