import joi from "joi";
import db from "../db.js";

export async function getProducts(req, res) {
  try {
    const arrayProducts = await db.collection("products").find().toArray();
    res.send(arrayProducts);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function postCarrinho(req, res) {
  const idSchema = joi.object({
    idProduct: joi.string().required(),
  });
  const { error } = idSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }
  const session = res.locals.tokenValidation;
  try {
    await db.collection("carrinho").insertOne({
      idUser: session.idUser,
      idProduct: req.body.idProduct,
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getCarrinho(req, res) {
  const session = res.locals.tokenValidation;
  try {
    const produtos = await db
      .collection("carrinho")
      .find({ idUser: session.idUser })
      .toArray();
    res.status(200).send(produtos);
  } catch (error) {
    res.status(500).send(error);
  }
}
