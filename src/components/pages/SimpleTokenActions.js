import React, { useEffect, useState } from "react";

export default function SimpleTokenActions({ account, accounts, simpleToken }) {
  const [burnAmount, setBurnAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [receiver, setReciver] = useState();

  const handleBurnChange = (e) => {
    setBurnAmount(e.target.value);
  };

  const handleBurn = () => {
    if (simpleToken) {
      simpleToken.methods.burn(burnAmount).call();
    }
  };

  const handleTransferChange = (e) => {
    setTransferAmount(e.target.value);
  };

  const handleReceiverChange = (e) => {
    setReciver(e.target.value);
  };

  const handleTransfer = () => {
    if (simpleToken) {
      simpleToken.methods.transfer(receiver, transferAmount).call();
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div className="burn">
        <input
          type="text"
          value={burnAmount}
          onChange={handleBurnChange}
        ></input>
        <button className="btn btn-primary" onClick={handleBurn}>
          Burn
        </button>
      </div>
      <div className="transfer">
        <input
          type="text"
          value={transferAmount}
          onChange={handleTransferChange}
        ></input>
        <select name="receiver" onChange={handleReceiverChange}>
          <option value="null"></option>
          {accounts.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleTransfer}>
          Burn
        </button>
      </div>
    </div>
  );
}
