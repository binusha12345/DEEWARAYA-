import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: email.trim() }
      );

      if (response.data.success) {
        setIsEmailSent(true);
        setMessage(response.data.message);
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Success Screen
  if (isEmailSent) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "60px", margin: "10px 0" }}>📧</p>
            <h2 style={{ color: "#16a34a", marginBottom: "15px" }}>
              Check Your Email!
            </h2>
            <p style={{ color: "#374151", marginBottom: "10px" }}>
              {message}
            </p>

            <div style={styles.infoBox}>
              <p style={{ margin: "5px 0", color: "#1e40af" }}>
                📬 <strong>{email}</strong>
              </p>
              <p style={{ margin: "5px 0", color: "#6b7280", fontSize: "13px" }}>
                ⏰ Link expires in <strong>15 minutes</strong>
              </p>
            </div>

            <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "15px" }}>
              💡 Check your spam/junk folder if you don't see it
            </p>

            <Link
              to="/login"
              style={{
                ...styles.button,
                display: "block",
                textDecoration: "none",
                marginTop: "20px",
                background: "#1e40af",
              }}
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔑 Forgot Password?</h2>
        <p style={styles.subtitle}>
          No worries! Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your registered email"
              style={{
                ...styles.input,
                border: error ? "2px solid #ef4444" : "1px solid #d1d5db",
              }}
            />
            {error && (
              <p style={styles.errorText}>⚠️ {error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              background: isLoading ? "#93c5fd" : "#1e40af",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "⏳ Sending..." : "📧 Send Reset Link"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          Remember your password?{" "}
          <Link to="/login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f9ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#1e40af",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "14px",
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    color: "#1e40af",
    fontWeight: "600",
    textDecoration: "none",
  },
  errorText: {
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "5px",
  },
  infoBox: {
    background: "#dbeafe",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "15px",
  },
};

export default ForgotPassword;