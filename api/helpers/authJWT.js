import jwt from 'jsonwebtoken';
import config from '../config/index.js';


// generate Token payload
export const generateTokenPayload = (user) => {
  return { userId: user._id, role: user.role };
};

// generateJWT
export const generateJWT = (payload) => {
  return jwt.sign(payload, config.JWT_TOKEN_SECRET, {
    expiresIn: config.JWT_TOKEN_TIME,
  });
};

// verify token
export const isValidToken = (token) => {
  return jwt.verify(token, config.JWT_TOKEN_SECRET);
};

// save the token in the cookies & attach it to response
export const tokenToCookiesRes = async (res, userToken) => {
  const accessToken = await generateJWT(userToken);
  const ageToken = 1000 * 60 * 60 * 24;
  let options = {
    httpOnly: true,
    maxAge: ageToken,
    secure: config.NODE_ENV === 'production',
    signed: true,
  };

  await res.cookie('accessToken', accessToken, options);
};


