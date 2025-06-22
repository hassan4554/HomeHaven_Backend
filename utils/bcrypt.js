import bcrypt from "bcrypt";
export const validatePassword = (userPassword, inputPassword) => {
  return bcrypt.compareSync(inputPassword, userPassword);
};
