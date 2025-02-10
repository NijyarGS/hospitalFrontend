/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useState } from "react";
import { getUserData } from "../services";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { t } = useTranslation();
  const dir = i18next.dir();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const canSubmit = username && password && !loading;

  async function handleSubmit(e) {
    setLoading(true);
    setError(null);
    e.preventDefault();

    const validData = {
      username,
      password,
    };

    const respond = await getUserData(validData);

    if (respond.status === "error") {
      setError(respond.message);
    }
    if (respond.status === "success") {
      navigate("/");
    }
    setLoading(false);
  }

  return (
    <div
      dir={dir}
      className="d-flex justify-content-center align-items-center h-100"
    >
      <div
        className="bg-body-tertiary border border-1 p-sm-5 p-4 m-sm-0 m-4"
        style={{ width: "max-content" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <form onSubmit={handleSubmit}>
            <h2 className="h1 fw-bold mb-5 pb-3">{t("login")}</h2>
            <div className="mb-5 pb-3 position-relative">
              <div className="form-group mb-3 pb-3">
                <label className="mb-3">{t("username")} :</label>
                <input
                  type="text"
                  className="form-control rounded-0 "
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <PasswordComponent
                password={password}
                setPassword={setPassword}
              />
              <button
                className="btn btn-primary w-100 rounded-0"
                type="submit"
                disabled={!canSubmit}
              >
                {loading ? (
                  <span className="spinner-border text-light spinner-border-sm"></span>
                ) : (
                  t("submit")
                )}
              </button>
              <ErrorComponent error={error} />
            </div>
            <p className="mb-0 small text-muted">{t("contact")}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

function PasswordComponent({ password, setPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="form-group mb-3 pb-3">
      <label className="mb-3">{t("password")} :</label>
      <div className="position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control rounded-0"
          style={{ paddingInlineEnd: "25px" }}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <a
          className="d-flex align-items-center"
          style={{
            cursor: "pointer",
            position: "absolute",
            marginInlineStart: "calc(100% - 25px)",
            top: "0",
            bottom: "0",
          }}
        >
          <i
            className={`bi bi-eye${
              showPassword ? "-slash" : ""
            } text-muteds link-secondary`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error }) {
  const { t } = useTranslation();

  return (
    error && (
      <div
        className="text-danger p-2 mt-3 position-absolute w-100"
        role="alert"
      >
        <li className="small">{t(error)}</li>
      </div>
    )
  );
}
