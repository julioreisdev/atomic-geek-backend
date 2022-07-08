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
    const tokenValidation = res.locals.tokenValidation;
    const { idProduct } = req.body;

    try {
        const findCart = await db.collection("carts").findOne({ idUser: tokenValidation.idUser })
        if(!findCart) {
            await db.collection("carts").insertOne({
                idUser: tokenValidation.idUser,
                idProducts: [idProduct]
            })
            return res.sendStatus(201);
        } else {
            const arrayAtualizado = [...findCart.idProducts, idProduct];
            await db.collection("carts").updateOne(
                { 
                    idUser: findCart.idUser 
                }, 
                {
                    $set: { idProducts: arrayAtualizado}
                })
            return res.sendStatus(200)
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}