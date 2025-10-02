require('dotenv').config();
const express = require("express");
const rotasUser = require('./routes/userRoutes');
const rotasAuth = require('./routes/authRoutes');
const app = express();


app.get('/',(req, res) => {
res.send({message: "API Online"});
});

app.use(express.json())
app.use(rotasUser)
app.use(rotasAuth)

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta 3000")
})