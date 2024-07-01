import React, { useEffect, useState } from "react";

export default function SimpleTokenActions({ account, accounts, simpleToken }) {
  const [burnAmount, setBurnAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [receiver, setReciver] = useState();

  const handleBurnChange = (e) => {
    setBurnAmount(e.target.value);
  };

  const handleBurn = async () => {
    if (simpleToken && account) {
      try {
        await simpleToken.methods
          .burn(web3.utils.toBigInt(burnAmount))
          .send({ from: account });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleTransferChange = (e) => {
    setTransferAmount(e.target.value);
  };

  const handleReceiverChange = (e) => {
    setReciver(e.target.value);
  };

  const handleTransfer = () => {
    if (simpleToken && account) {
      try {
        simpleToken.methods
          .transfer(receiver, web3.utils.toBigInt(transferAmount))
          .send({ from: account });
      } catch (error) {
        console.error("An error occurred:", error);
      }
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
          Transfer
        </button>
      </div>
    </div>
  );
}
