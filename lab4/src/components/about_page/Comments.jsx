import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';

function Comments() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        } else {
          setUserProfile({ displayName: 'Користувач' });
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(loadedComments);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setError('Коментар не може бути порожнім');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        uid: currentUser.uid,
        username: userProfile?.displayName || 'Користувач',
        text: commentText,
        createdAt: new Date(),
      });

      setCommentText('');
    } catch (err) {
      setError('Помилка при збереженні коментаря');
      console.error(err);
    }
  };

  return (
    <section className="comments">
      <div className="comment-form">
        <h3>Нам важлива Ваша думка про нас!</h3>

        {!currentUser && (
          <div
            style={{
              background: '#ffe6e6',
              border: '1px solid #ffcccc',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              color: '#cc0000',
              textAlign: 'center',
            }}
          >
            Щоб залишити коментар, увійдіть в акаунт
          </div>
        )}

        {currentUser && userProfile && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Введіть свій коментар тут..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <input type="submit" value="Опублікувати" />
          </form>
        )}

        {error && (
          <p
            style={{
              color: 'red',
              marginTop: '0.5rem',
              transition: 'opacity 0.5s ease',
              width: '100%',
            }}
          >
            {error}
          </p>
        )}
      </div>

      <div className="published-comments">
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <strong>{c.username}:</strong> {c.text}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Comments;
