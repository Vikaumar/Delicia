import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  // accept either headers.token or Authorization: Bearer <token>
  const rawToken = req.headers.token || req.headers.authorization;
  let token = rawToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }

  // if "Bearer <token>" format, extract actual token
  if (typeof token === 'string' && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // attach both for compatibility
    req.user = { id: token_decode.id };
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

export default authMiddleware;
