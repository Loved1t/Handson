const express = require("express");
const axios = require("axios");
const _ = require("lodash");

const app = express();

// 🚨 Vulnerability 1: Unvalidated user input in query
app.get("/echo", (req, res) => {
    res.send("You said: " + req.query.msg);
});

// 🚨 Vulnerability 2: SSRF (Server-Side Request Forgery)
app.get("/fetch", async (req, res) => {
    try {
        const url = req.query.url;
        const response = await axios.get(url); // no validation!
        res.send(response.data);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

// 🚨 Vulnerability 3: Lodash prototype pollution
app.get("/merge", (req, res) => {
    let obj = {};
    _.merge(obj, JSON.parse(req.query.data || "{}"));
    res.json(obj);
});

app.listen(3000, () => {
    console.log("Vulnerable app running on http://localhost:3000");
});
