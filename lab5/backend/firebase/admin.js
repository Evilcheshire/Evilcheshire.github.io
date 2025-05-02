const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let serviceAccount;

if (process.env.SERVICE_ACCOUNT_KEY_B64) {
  try {
    const decoded = Buffer.from(process.env.SERVICE_ACCOUNT_KEY_B64, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(decoded);
  } catch (err) {
    console.error('Failed to parse SERVICE_ACCOUNT_KEY_B64:', err);
    throw err;
  }
} else {
  const keyPath = path.join(__dirname, 'serviceAccountKey.json');
  if (!fs.existsSync(keyPath)) {
    throw new Error('Missing serviceAccountKey.json and SERVICE_ACCOUNT_KEY_B64 is not set');
  }
  serviceAccount = require(keyPath);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

module.exports = { admin, db };