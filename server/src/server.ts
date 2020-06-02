import express from 'express';

const app = express();


app.get('/recurso', (request, response) => {
    response.json([
        'Zed',
        'Katarina',
        'Lucian',
        'Draven',
        'Kassadin',
    ]);
});

app.listen(3333);


