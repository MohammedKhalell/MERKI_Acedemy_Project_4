const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter = require("./routes/user");
const productsRouter = require("./routes/product");
const rolesRouter = require("./routes/roles");
const categorysRouter = require("./routes/category");
const cartRouter = require("./routes/cart");

// Routes Middleware
app.use("/", usersRouter);
app.use("/products", productsRouter);
app.use("/roles", rolesRouter);
app.use("/category", categorysRouter);
app.use("/cart", cartRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
