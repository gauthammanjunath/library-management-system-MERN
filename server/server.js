const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 6000;

const usersRoute=require("./routes/usersRoute");
const booksRoute=require("./routes/booksRoute");
const issuesRoute=require("./routes/issuesRoute");  


app.use("/api/users",usersRoute);
app.use("/api/books",booksRoute);
app.use("/api/issues",issuesRoute);

app.listen(port, () => {
    console.log(`Hello, World! Server is running on port ${port}`);
});