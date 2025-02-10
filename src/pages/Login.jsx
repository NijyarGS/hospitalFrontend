import { useTranslation } from "react-i18next";
import i18next from "i18next";

export default function Login() {
  const { t } = useTranslation();
  const dir = i18next.dir();

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
          <h2 className="h1 fw-bold mb-5 pb-3">{t("login")}</h2>
          <div className="mb-5 pb-3">
            <div className="form-group mb-3 pb-3">
              <label className="mb-3">{t("username")} :</label>
              <input type="text" className="form-control rounded-0" />
            </div>
            <div className="form-group mb-3 pb-3">
              <label className="mb-3">{t("password")} :</label>
              <input type="password" className="form-control rounded-0" />
            </div>
            <button className="btn btn-primary w-100 rounded-0">
              {t("submit")}
            </button>
          </div>

          <p className="mb-0 small text-muted">{t("contact")}</p>
        </div>
      </div>
    </div>
  );
}
