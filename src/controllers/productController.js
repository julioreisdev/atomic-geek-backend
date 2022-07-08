import joi from "joi";
import { ObjectId } from "mongodb";
import db from "../db.js";

export async function getProducts(req, res) {
  try {
    const arrayProducts = await db.collection("products").find().toArray();
    res.send(arrayProducts);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function selectProduct(req, res) {
  const id = joi.object({
    idProduct: joi.string().required(),
  });

  const tokenValidation = res.locals.tokenValidation;
  const { idProduct } = req.body;

  const { error } = id.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  try {
    const findCart = await db
      .collection("carts")
      .findOne({ idUser: tokenValidation.idUser });
    if (!findCart) {
      await db.collection("carts").insertOne({
        idUser: tokenValidation.idUser,
        idProducts: [idProduct],
      });
      return res.sendStatus(201);
    } else {
      const arrayAtualizado = [...findCart.idProducts, idProduct];
      await db.collection("carts").updateOne(
        {
          idUser: findCart.idUser,
        },
        {
          $set: { idProducts: arrayAtualizado },
        }
      );
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getCarrinho(req, res) {
  const session = res.locals.tokenValidation;
  try {
    const produtos = await db
      .collection("carts")
      .find({ idUser: session.idUser })
      .toArray();
    const ids = produtos[0].idProducts;
    const products = [];
    let total = 0;
    for (let i = 0; i < ids.length; i++) {
      let p = await db
        .collection("products")
        .findOne({ _id: ObjectId(ids[i]) });
      products.push(p);
      total += Number(p.preco);
    }
    res.status(200).send({ products, total });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteCarrinho(req, res) {
  const idSchema = joi.object({
    idProduct: joi.string().required(),
  });
  const { error } = idSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }
  const session = res.locals.tokenValidation;
  let existe = false;
  try {
    const produtos = await db
      .collection("carts")
      .find({ idUser: session.idUser })
      .toArray();
    const ids = produtos[0].idProducts;
    const newIds = [];
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === req.body.idProduct) {
        ids[i] = "";
        existe = true;
        break;
      }
    }
    if (!existe) {
      return res.status(404).send("Produto não existe no seu carrinho");
    }
    for (let i = 0; i < ids.length; i++) {
      if (ids[i].length > 0) {
        newIds.push(ids[i]);
      }
    }
    await db
      .collection("carts")
      .updateOne({ idUser: session.idUser }, { $set: { idProducts: newIds } });
    res.status(200).send(newIds);
  } catch (error) {
    res.status(500).send(error);
  }
}
