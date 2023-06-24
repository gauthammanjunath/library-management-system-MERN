const express = require("express");
const app = express();
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Hello, World! Server is running on port ${port}`);
});