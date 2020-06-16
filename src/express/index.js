'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const router = require(`./routes`);

const PORT = 8080;

const app = express();

app.use(router);
app.listen(PORT, () => console.info(chalk.green(`Server launched on port: ${PORT}`)));
