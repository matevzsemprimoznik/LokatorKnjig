import admin from 'firebase-admin';
import { serviceAccount } from '../serviceAccoutKey.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (authHeader) {
    const idToken = authHeader.split(' ')[1];
    try {
      const response = await admin.auth().verifyIdToken(idToken);
      return next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};
