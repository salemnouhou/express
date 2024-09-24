const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/authorize', (req, res) => {
    const trelloAuthUrl = 'https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=c44fc1d689c275f0c20f261b7827cfaa&return_url=https://localhost:3000/callback';
    res.redirect(trelloAuthUrl);
});

app.get('/callback', (req, res) => {
    const token = req.query.token;

    const tokenData = { token: token };

    res.json(tokenData);
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});
