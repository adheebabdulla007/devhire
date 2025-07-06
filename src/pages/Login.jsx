import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const MIN_PASSWORD_LENGTH = 6;

  const validate = () => {
    const errors = {};

    formData.email = formData.email.toLowerCase();

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // 🔴 Stop here if form is invalid
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log("User logged in:", user);
      alert("Login successful!");

      // Optional: Reset form
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Firebase login error:", error.code);

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/invalid-credential":
          setErrors({ email: "No account found with this email" });
          break;
        case "auth/wrong-password":
          setErrors({ password: "Incorrect password" });
          break;
        case "auth/invalid-email":
          setErrors({ email: "Invalid email format" });
          break;
        default:
          alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </main>
  );
}
console.log("Firebase Auth:", auth);

export default Login;
