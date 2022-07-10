import db from "../db.js";
import dayjs from "dayjs";

export async function postSale(req, res) {
  const tokenValidation = res.locals.tokenValidation;
  const body = req.body;
  try {
    await db.collection("sales").insertOne({
      idUser: tokenValidation.idUser,
      idProducts: body.idProducts,
      dia: dayjs().format("DD/MM/YY"),
      pagamento: body.pagamento,
      valorTotal: body.valorTotal,
    });
    await db.collection("carts").deleteOne({ idUser: tokenValidation.idUser });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
}
