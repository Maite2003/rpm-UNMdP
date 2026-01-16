import bcrypt from 'bcryptjs';

export const saltAndHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};