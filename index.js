const express = require("express");
const postRoutes = require('./Routes/postRoutes');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log("server running on port " + (process.env.PORT || 4000));
});
