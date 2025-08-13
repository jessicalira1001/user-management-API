require('dotenv').config();
const express = require("express")
const app = express();
const pool = require('./config/db.js')


app.get('/',(req, res) => {
res.send({message: "API Online"});
});

app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta 3000")
})