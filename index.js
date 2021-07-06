require('dotenv').config();
const express = require("express");
const postRoutes = require('./Routes/postRoutes');
const cors = require("cors");
const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log("server running on port " + port);
});
