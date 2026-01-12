"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Illustration from "../components/Illustration";
import Input from "../components/Input";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import { useLogin } from "../lib/hooks";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isLoading } = useLogin();

  // SVG Icons
  const UserIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const EyeIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={() => setShowPassword(!showPassword)}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const LogoIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const ArrowRight = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginLeft: "8px" }}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { username, password, stayLoggedIn: rememberMe },
      {
        onSuccess: (data) => {
          if (data && (data.token || data.attachmentToken)) {
            // Token is already stored in api.js, just redirect
            router.push("/inventory");
          } else {
            console.warn("Login successful but no token in response", data);
            router.push("/inventory"); // Fallback for demo
          }
        },
        onError: (error) => {
          console.error("Login handling error:", error);
          alert("Login failed: " + error.message);
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Illustration */}
      <div className={styles.leftPanel}>
        <Illustration />
      </div>

      {/* Right Panel - Login Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <div className={styles.logo}>{LogoIcon}</div>
            <h1 className={styles.title}>Home Inventory</h1>
            <p className={styles.subtitle}>Track and organize your things</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Sign in to your account</h2>

            <form onSubmit={handleSubmit}>
              <Input
                id="username"
                label="Username"
                placeholder="Enter your username"
                icon={UserIcon}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                icon={EyeIcon}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className={styles.actions}>
                <Checkbox
                  id="remember"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span className={styles.forgotPassword}>Forgot password?</span>
              </div>

              <Button fullWidth type="submit">
                Sign in {ArrowRight}
              </Button>
            </form>

            <div className={styles.registerLink}>
              Don't have an account? <span>Create one</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div>Version 1.2.4</div>
          <div className={styles.footerLinks}>
            <span>Help Center</span> • <span>Privacy Policy</span> •{" "}
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}
