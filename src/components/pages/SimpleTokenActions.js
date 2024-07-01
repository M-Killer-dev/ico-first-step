import React, { useEffect, useState } from "react";

export default function SimpleTokenActions({ account, accounts, simpleToken }) {
  const [burnAmount, setBurnAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [receiver, setReciver] = useState();
  const [sender, setSender] = useState();
  const [receiver1, setReciver1] = useState();
  const [availableAmount, setAvailableAmount] = useState(0);
  const [transferAmount1, setTransferAmount1] = useState(0);

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

  const handleTransfer = async () => {
    if (simpleToken && account) {
      try {
        await simpleToken.methods
          .transfer(receiver, web3.utils.toBigInt(transferAmount))
          .send({ from: account });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleChangeTransferAmount1 = (e) => {
    setTransferAmount1(e.target.value);
  };

  const handleSenderChange = (e) => {
    setSender(e.target.value);
  };

  const handleReceiver1Change = (e) => {
    setReciver1(e.target.value);
  };

  const handleTransferFrom = async () => {
    if (simpleToken && account && availableAmount > transferAmount1) {
      try {
        await simpleToken.methods
          .transferFrom(sender, receiver1, web3.utils.toBigInt(transferAmount1))
          .call();
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div className="burn d-flex">
        <input
          type="text"
          value={burnAmount}
          onChange={handleBurnChange}
        ></input>
        <button className="btn btn-primary" onClick={handleBurn}>
          Burn
        </button>
      </div>
      <div className="transfer d-flex">
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
      <div className="transfer-from d-flex">
        <input
          type="text"
          value={transferAmount1}
          onChange={handleChangeTransferAmount1}
        ></input>
        <select name="sender" onChange={handleSenderChange}>
          <option value="null"></option>
          {accounts.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select name="receiver" onChange={handleReceiver1Change}>
          <option value="null"></option>
          {accounts.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label>available: </label>
        <label>{availableAmount} </label>
        <button className="btn btn-primary" onClick={handleTransferFrom}>
          Transfer From
        </button>
      </div>
    </div>
  );
}
