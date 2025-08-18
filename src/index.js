require('dotenv').config();
const express = require("express");
const rotasUser = require('./routes/userRoutes');
const app = express();




app.get('/',(req, res) => {
res.send({message: "API Online"});
});

app.use(express.json())
app.use(rotasUser)

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta 3000")
})