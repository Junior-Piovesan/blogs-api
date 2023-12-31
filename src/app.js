const express = require('express');
const routers = require('./routes');
const middlewares = require('./middlewares/userMidlawares');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use(routers);

app.use(middlewares.errorMiddleware);// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
