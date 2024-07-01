import React, { useEffect, useState } from "react";

export default function ContractInfo({ simpleToken }) {
  const [balance, setBalance] = useState(0);
  const [presaleContractAddress, setPresaleContractAddress] = useState("");

  useEffect(() => {
    if (simpleToken) {
      simpleToken.methods.balance().call.then((b) => {
        setBalance(b);
      });
      simpleToken.methods.getPresaleContractAddress().call.then((address) => {
        setPresaleContractAddress(address);
      });
    }
  }, []);

  return (
    <div>
      <h2>SimpleToken Contract</h2>
      <div className="d-flex">
        <label>balance : &nbsp;</label>
        <label></label>
      </div>
      <div className="d-flex">
        <label>presaleContractAddress : &nbsp;</label>
        <label></label>
      </div>
    </div>
  );
}
