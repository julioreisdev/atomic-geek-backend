import saleSchema from "../schemas/saleSchema.js";

export async function saleMiddleware(req, res, next) {
  const tokenValidation = res.locals.tokenValidation;
  const { error } = saleSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  res.locals.tokenValidation = tokenValidation;

  next();
}