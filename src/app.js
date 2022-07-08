import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getRouters from "./routers/getRouters.js";
import postRouters from "./routers/postRouters.js";
import deleteRouters from "./routers/deleteRouters.js";

dotenv.config();
const app = express();
app.use(express.json(), cors());

app.use(getRouters);
app.use(postRouters);
app.use(deleteRouters);

app.listen(process.env.PORT, () => {
  console.log("Server running!!!");
});
