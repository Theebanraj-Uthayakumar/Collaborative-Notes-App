import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../shared/utils/helpers";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<{
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
  }>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({ username: "", password: "", confirmPassword: "", email: "" });

    if (!email || !username || !password || !confirmPassword) {
      setError({
        ...error,
        email: !email ? "Email is required." : "",
        username: !username ? "Username is required." : "",
        password: !password ? "Password is required." : "",
        confirmPassword: !confirmPassword
          ? "Confirm Password is required."
          : "",
      });
      return;
    } else {
      if (!validateEmail(email)) {
        setError({ ...error, email: "Please enter a valid email address." });

        return;
      }

      if (password.length < 6) {
        setError({
          ...error,
          password: "Password must be at least 6 characters long.",
        });

        return;
      }

      if (password !== confirmPassword) {
        setError({
          ...error,
          confirmPassword: "Passwords do not match.",
        });

        return;
      }

      try {
        await register(username, password, email);
        toast.success("Registration successful! You can now log in.");
        navigate("/");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
        console.error("Registration failed:", error);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError({ ...error, email: "" });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError({ ...error, username: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError({ ...error, password: "" });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setError({ ...error, confirmPassword: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Register</h2>
      <div style={styles.field}>
        <label style={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error?.email}</div>}
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error?.username}</div>}
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error?.password}</div>}
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          style={styles.input}
        />
        {error && <div style={styles.error}>{error?.confirmPassword}</div>}
      </div>
      <button type="submit" style={styles.button}>
        Register
      </button>
      <div style={styles.signin}>
        Already have an account?{" "}
        <Link to="/signin" style={styles.signinLink}>
          Sign In here
        </Link>
      </div>
    </form>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "-webkit-fill-available",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    padding: "5px",
    marginBottom: "12px",
    fontSize: "14px",
  },
  signin: {
    marginTop: "15px",
    textAlign: "center" as const,
  },
  signinLink: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default Register;
