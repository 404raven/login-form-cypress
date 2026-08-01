import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    terms: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const emailValid = emailRegex.test(form.email);
  const passwordValid = passwordRegex.test(form.password);

  const formValid =
    emailValid && passwordValid && form.terms;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid) {
      navigate("/success");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>

        <h1>Login</h1>

        <label>Email</label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        {!emailValid && form.email && (
          <p className="error">
            Geçerli bir email giriniz.
          </p>
        )}

        <label>Password</label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />

        {!passwordValid && form.password && (
          <p className="error">
            Şifre en az 8 karakter, büyük harf, küçük harf ve rakam içermelidir.
          </p>
        )}

        <label className="checkbox">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />

          Şartları kabul ediyorum
        </label>

        <button disabled={!formValid}>
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;