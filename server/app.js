const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config');
const path = require('path')

const app = express();
app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '250mb', extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});


// app.use("/", (req, res) => res.render(require('./../client/build/index.html')))

app.use("/server", require('./routes')())
app.use((req, res) => {
    //   var err = new Error('Not Found');
    res.sendStatus(404);
});
app.use(
    express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)
app.listen(PORT, () => console.info(`Server listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
    console.info('[uncaughtException] %s', err.stack);
});