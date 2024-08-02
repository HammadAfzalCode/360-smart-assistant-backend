require("dotenv").config({ path: `${process.cwd()}/.env` });
const cors = require("cors");
const express = require("express");

const authRouter = require("./route/authRoute");
const wishlistRouter = require("./route/wishlistRoute");
const { addEmail } = require("./controller/wishlistController");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hey there",
  });
});
// all routes

app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/wishlist", wishlistRouter);

app.post("/api/v1/wishlist", addEmail);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "route not found",
  });
});
app.listen(PORT, () => {
  console.log("server is listening on port:", PORT);
});
