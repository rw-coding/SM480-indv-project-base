const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, 'static')));

router.use(require("./server/routes/api_routes"));
app.use('/api/v1', router);

app.get('/twitter-search', function (req, res) {
    return res.send('pong');
});
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 8080);