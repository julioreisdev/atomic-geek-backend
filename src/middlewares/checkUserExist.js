import userRegister from "../schemas/registerSchema.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const cliente = new MongoClient(process.env.MONGO_URL);
let db;
cliente.connect().then(() => {
  db = cliente.db(process.env.MONGO_NAME);
});

async function checkUserExist(req, res, next) {
  const { error } = userRegister.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  const { email } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (user) {
      return res.status(409).send("E-mail já cadastrado");
    }
  } catch (error) {
    return res.send(error);
  }
  next();
}

export default checkUserExist;
