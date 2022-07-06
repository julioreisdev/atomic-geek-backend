import joi from "joi";

const userRegister = joi.object({
  nome: joi.string().min(1).required(),
  email: joi.string().email().required(),
  senha: joi.string().min(6).required(),
  cep: joi.string().min(8).required(),
  rua: joi.string().required(),
});

export default userRegister;