const { db } = require('../firebase/admin');

const getMenu = async (req, res) => {
  try {
    const snapshot = await db.collection('menu').get();
    const menu = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu', error });
  }
};

module.exports = { getMenu };
