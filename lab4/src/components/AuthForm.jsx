import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const AuthForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(""); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName,
          email,
          createdAt: new Date()
        });

        await updateProfile(user, {
          displayName: displayName,
        });

        alert("Реєстрація успішна!");
        onClose();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Вхід виконано!");
        onClose();
      }
    } catch (err) {
      console.log(err)
      if (err.message == "Firebase: Error (auth/invalid-credential).") {
        setError("Неправильна пошта або пароль. ")
        setEmail("");
        setPassword("");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="auth-form" style={styles.container}>
      <h2>{isRegistering ? "Реєстрація" : "Вхід"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Ім’я"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={styles.input}
            required
          />
        )}
        <input
          type="email"
          placeholder="Електронна пошта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          {isRegistering ? "Зареєструватись" : "Увійти"}
        </button>
        <p style={{ marginTop: "1rem" }}>
          {isRegistering ? "Вже маєте акаунт?" : "Ще не маєте акаунту?"}{" "}
          <span
            style={styles.toggle}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Увійти" : "Зареєструватись"}
          </span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "5vh auto",
    padding: "2rem",
    borderRadius: "8px",
    background: "#f0f0f0",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#468286",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  toggle: {
    color: "#468286",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: 'red',
    marginTop: '0.5rem',
    padding:'0',
    width: '100%',
    transition: 'opacity 0.5s ease',
  },
};

export default AuthForm;
