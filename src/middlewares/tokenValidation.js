import db from "../db.js";

export async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    
    const token = authorization?.replace('Bearer ', '')
    const tokenValidation = await db.collection("sessions").findOne({ token: token });
    if(!tokenValidation) {
        return res.status(498).send("Token expirado/inválido");
    }
    res.locals.tokenValidation = tokenValidation;

    next();
}