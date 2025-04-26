import { useState, useEffect } from 'react';

function Comments() {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !commentText.trim()) {
      setError("Будь ласка, заповніть обидва поля");
      return;
    }

    const newComment = { username, text: commentText };
    setComments([newComment, ...comments]);
    setUsername('');
    setCommentText('');
    setError('');
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000); 
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <section className="comments">
      <div className="comment-form">
        <h3>Нам важлива Ваша думка про нас!</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Введіть свій коментар тут..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <input type="submit" value="Опублікувати" />
        </form>

        {error && (
          <p style={{
            color: 'red',
            marginTop: '0.5rem',
            padding:'0',
            width: '100%',
            transition: 'opacity 0.5s ease',
          }}>
            {error}
          </p>
        )}
      </div>

      <div className="published-comments">
        {comments.map((c, i) => (
          <div key={i} className="comment-item">
            <strong>{c.username}:</strong> {c.text}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Comments;
