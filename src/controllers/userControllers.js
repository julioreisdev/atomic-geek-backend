import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const cliente = new MongoClient(process.env.MONGO_URL);
let db;
cliente.connect().then(() => {
  db = cliente.db(process.env.MONGO_NAME);
});

export async function getExemplo(req, res) {
  res.send("Deu bom!!");
}

export async function register(req, res) {
  try {
    await db.collection("users").insertOne({
      ...req.body,
      type: "normal",
    });
  } catch (error) {
    return res.send(error);
  }
  res.sendStatus(201);
}
