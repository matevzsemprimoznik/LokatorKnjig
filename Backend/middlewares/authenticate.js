import admin from 'firebase-admin';

const SERVICE_KEY_ENV = process.env.SERVICE_KEY
const SERVICE_KEY = SERVICE_KEY_ENV.split('!')

const serviceAccount = {
    type: SERVICE_KEY[0],
    project_id: SERVICE_KEY[1],
    private_key_id: SERVICE_KEY[2],
    private_key: SERVICE_KEY[3],
    client_email: SERVICE_KEY[4],
    client_id: SERVICE_KEY[5],
    auth_uri: SERVICE_KEY[6],
    token_uri: SERVICE_KEY[7],
    auth_provider_x509_cert_url: SERVICE_KEY[8],
    client_x509_cert_url: SERVICE_KEY[9],
};

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
