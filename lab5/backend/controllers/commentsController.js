const { admin, db } = require('../firebase/admin');
const COMPETITOR_NAMES = require('./competitors');

const getComments = async (req, res) => {
  try {
    const snapshot = await db.collection('comments').get();
    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

const addComment = async (req, res) => {
  const { text } = req.body;
  const { uid } = req.user;

  const containsCompetitor = COMPETITOR_NAMES.some(comp =>
    text.toLowerCase().includes(comp.toLowerCase())
  );
  if (containsCompetitor) {
    return res.status(400).json({ message: 'Коментар містить недопустимі символи' });
  }

  try {
    const userRecord = await admin.auth().getUser(uid);
    const username = userRecord.displayName || userRecord.email || 'Користувач';

    await db.collection('comments').add({
      text,
      uid,
      username,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

module.exports = { getComments, addComment };
