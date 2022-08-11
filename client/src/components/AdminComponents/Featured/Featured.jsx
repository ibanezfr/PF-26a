import React from "react";
import { useTranslation } from 'react-i18next';

const Featured = () => {
  const { t } = useTranslation();
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{t('featuredAdmin.spanIncome')}</span>
        <div className="featuredMoneyContainer">
          {/* <span className="featuredMoney">${income[1]?.total}</span> */}
          <span className="featuredMoneyRate">
            {/* %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              // <ArrowDownward className="featuredIcon negative" />
            ) : (
              // <ArrowUpward className="featuredIcon" />
            )} */}
          </span>
        </div>
        <span className="featuredSub">{t('featuredAdmin.spanComparison')}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{t('featuredAdmin.spanSells')}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            {/* -1.4 <ArrowDownward className="featuredIcon negative" /> */}
          </span>
        </div>
        <span className="featuredSub">{t('featuredAdmin.spanComparison')}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{t('featuredAdmin.spanCosts')}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon" /> */}
          </span>
        </div>
        <span className="featuredSub">{t('featuredAdmin.spanComparison')}</span>
      </div>
    </div>
  );
};

export default Featured;
