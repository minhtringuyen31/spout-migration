import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateData = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateData()) return;
    login(username, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/team-list");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center px-10">
      <div className="flex flex-col justify-center items-center w-1/2">
        <img src="/des-bg.webp" />
        <p className="text-2xl font-bold my-3">
          Collaborate on key conversations
        </p>
        <div className="w-2/3 text-center">
          <p>
            Combine all your messaging channels into one and work together
            efficiently across teams through automatic chat assignment and
            internal notes
          </p>
        </div>
      </div>

      <div className="h-auto w-1/3 flex flex-col justify-center items-center bg-white rounded-lg px-10 py-16 gap-y-2">
        <h2 className="text-2xl font-bold mb-5">Welcome back</h2>
        <p className="mb-4">Sign in to continue Spout</p>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username*"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${
            errors.username && "border-red-600"
          } border p-2 w-full rounded-md`}
        />
        {errors.username && (
          <p className="text-red-600 text-sm mb-2">{errors.username}</p>
        )}
        <input
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${
            errors.password && "border-red-600"
          } border p-2 w-full rounded-md`}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-2">{errors.password}</p>
        )}
        <p className="text-sm mb-4 text-right w-full">
          <a href="forgot-password">Forgot password?</a>
        </p>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
          onClick={handleLogin}
          disabled={loading} // Vô hiệu hóa nút khi đang tải
        >
          {loading ? "Continuing..." : "Continue"}
        </button>
        <p className="mt-4 w-full text-left">
          Don’t have an account?{" "}
          <a href="signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
