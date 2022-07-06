import joi from "joi";

const userLogin = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required(),
});

export default userLogin;
