const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const categoryRouter = require("./routes/category");

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/category", categoryRouter);

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
