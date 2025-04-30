const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { admin } = require('./firebase/admin');
const { getComments, addComment } = require('./controllers/commentsController');
const { getMenu } = require('./controllers/menuController');
const { getUsers } = require('./controllers/usersController');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../public'));
app.use('/', express.static('public'));

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Unauthorized', error });
  }
};

app.get('/api/menu', getMenu);
app.get('/api/comments', getComments);
app.post('/api/comments', authMiddleware, addComment);
app.get('/api/users', getUsers);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
