
// import bcrypt from 'bcrypt';

// export const hashPassword = (password) => {
//   const salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// };

// export const comparePassword = (password, hashedPassword) => {
//   return bcrypt.compareSync(password, hashedPassword);
// };

import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
