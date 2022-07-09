import joi from "joi";

const saleSchema = joi.object({
  idProducts: joi.array().items(joi.string()).required(),
  valorTotal: joi.string().required(),
  pagamento: joi.string().valid("Dinheiro", "Cartão", "Boleto")
});

export default saleSchema;