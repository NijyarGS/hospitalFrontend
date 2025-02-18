import { Fragment, useState } from "react";
import CasesAdd from "./CasesAdd";
import { useTranslation } from "react-i18next";

export default function CasesHeader() {
  const [viewAddCase, setViewAddCase] = useState(false);

  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="mb-4 d-flex justify-content-between">
        <h4 className="mb-0">{t("cases.cases")}</h4>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setViewAddCase(true)}
        >
          <i className="bi bi-plus" />
          <span className="mx-1">{t("cases.add")}</span>
        </button>
      </div>
      <CasesAdd viewAddCase={viewAddCase} setViewAddCase={setViewAddCase} />
    </Fragment>
  );
}
