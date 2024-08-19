import React from "react";

const Accounts: React.FC = () => {
  return (
    <>
      <div className="border h-auto">
        <h5>Ema</h5>
        <h5>
          <u>Cuentas asociadas</u>
        </h5>
        <span className="border d-flex gap-2">
          <p>Banco Provincia</p>
          <p>Cuenta Nro:</p> <b>0303456</b>
        </span>
      </div>
    </>
  );
};

export default Accounts;
