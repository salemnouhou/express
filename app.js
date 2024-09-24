const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/authorize', (req, res) => {
    const trelloAuthUrl = 'https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read,write,account&response_type=token&key=24dae7ea7be0b916f47975a8e2316242&return_url=https://express-trello.onrender.com/callback';
    res.redirect(trelloAuthUrl);
});

app.get('/callback', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Callback</title>
        </head>
        <body>
        <div id="content"></div>
            <script>
                const hash = window.location.hash;
                const params = new URLSearchParams(hash.slice(1)); 
                const token = params.get('token'); 

                if (token) {
                    fetch('https://express-trello.onrender.com/receive-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token: token })
                    })
                    .then(response => response.json())
                    .then(data => console.log('Réponse du serveur:', data))
                    .catch(error => console.error('Erreur:', error));
                    let content = document.getElementById("content")
                    content.innerHTML="AUTHENTIFICATION REUSSIE VEUILLEZ RETOURNER VOUS CONNECTER A LAPPLICATION"
                } else {
                    console.error('Aucun token trouvé dans le fragment.');
                }
            </script>
        </body>
        </html>
    `);
});

app.post('/receive-token', (req, res) => {
    const { token } = req.body;

    if (token) {
        console.log('Token reçu:', token);
        // res.json({ message: 'Token reçu avec succès', token: token });

    } else {
        res.status(400).json({ error: 'Aucun token fourni' });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${PORT}`);
});


