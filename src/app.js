import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getRouters from "./routers/getRouters.js";
import postRouters from "./routers/postRouters.js";

dotenv.config();
const app = express();
app.use(express.json(), cors());

app.use(getRouters);
app.use(postRouters);

app.listen(process.env.PORT, () => {
  console.log("Server running!!!");
});
