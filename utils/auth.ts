import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Generate a JWT token
export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "2h" });
};

// Verify and decode a JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
};

// Generate a hash password
export const generateHashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};

// Compare a password with a hash
export const comparePassword = async (plainPassword, hashPassword) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};
