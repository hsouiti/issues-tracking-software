import jwt from 'jsonwebtoken';

// generate Token payload
export const generateTokenPayload = (user) => {
  return { userId: user._id, role: user.role };
};

// generateJWT
export const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// verify token
export const isValidToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// save the token in the cookies & attach it to response
export const tokenToCookiesRes = async (res, userToken) => {
  const accessToken = await generateJWT(userToken);
  const ageToken = 1000 * 60 * 60 * 24;
  let options = {
    httpOnly: true,
    maxAge: ageToken,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  };

  await res.cookie('accessToken', accessToken, options);
};


// roles & permissions
export const authRole = (...roles) => {
  return 
}

/* *********************************
// roles & permissions
// authorize the routes for this user or not
/* function authRole(role) {
  return (req, res, next) => {
    console.log(role, req.user.role);
    if (req.user.role !== role) {
      return res.status(401).send('Not Allowed');
    }
    next();
  };
} */
