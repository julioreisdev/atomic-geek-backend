import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import userLogin from "../schemas/loginSchema.js";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function getExemplo(req, res) {
  res.send("Deu bom!!");
}

export async function register(req, res) {
  const senha = bcrypt.hashSync(req.body.senha, 10);
  try {
    await db.collection("users").insertOne({
      ...req.body,
      senha,
      type: "normal",
    });
  } catch (error) {
    return res.send(error);
  }
  res.sendStatus(201);
}

export async function login(req, res) {
  const { error } = userLogin.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }
  try {
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.senha, user.senha)) {
      const token = uuid();
      try {
        await db.collection("sessions").insertOne({
          idUser: user._id,
          token,
        });
      } catch (error) {
        return res.send(error);
      }
      return res.status(200).send({ token, nome: user.nome });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.send(error);
  }
}
