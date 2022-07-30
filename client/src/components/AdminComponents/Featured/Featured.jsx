import React from "react";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Ingresos</span>
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
        <span className="featuredSub">Comparación con el mes pasado</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            {/* -1.4 <ArrowDownward className="featuredIcon negative" /> */}
          </span>
        </div>
        <span className="featuredSub">Comparación con el mes pasado</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Costo</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            {/* +2.4 <ArrowUpward className="featuredIcon" /> */}
          </span>
        </div>
        <span className="featuredSub">Comparción con el mes pasado</span>
      </div>
    </div>
  );
};

export default Featured;
