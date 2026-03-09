const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());

const config = {
    user: "azureuser",
    password: "Password123!",
    server: "your-server.database.windows.net",
    database: "demoDB",
    options: {
        encrypt: true
    }
};

app.get("/users", async (req, res) => {

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT name FROM Users`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }

});

app.listen(3000, () => {
    console.log("API running");
});