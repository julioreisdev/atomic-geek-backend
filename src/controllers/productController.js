import db from "../db.js";

export async function getProducts(req, res) {
    try {
        const arrayProducts = await db.collection("products").find().toArray();
        res.send(arrayProducts);
    } catch (error) {
        res.status(500).send(error);
    }
}