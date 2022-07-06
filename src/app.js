import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getRouters from "./routers/getRouters.js";

dotenv.config();
const app = express();
app.use(express.json(), cors());

app.use(getRouters);

app.listen(process.env.PORT, () => {
  console.log("Server runnig!!!");
});
