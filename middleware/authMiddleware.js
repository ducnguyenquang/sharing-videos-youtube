import { verifyToken } from '@/utils/auth';

const authMiddleware = (handler) => async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authorization.split(' ')[1];
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // You can access the user data from the decoded token in your API routes
  req.user = decodedToken;

  return handler(req, res);
};

export default authMiddleware;
