import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export default function Unavilable() {
  const { t } = useTranslation();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="mb-4">{t("error.page")}</h2>
      <p className="text-muted">{t("error.pageMessage")}</p>
      <Link className="btn btn-primary" to="/">
        {t("error.pageBackHome")}
      </Link>
    </div>
  );
}
