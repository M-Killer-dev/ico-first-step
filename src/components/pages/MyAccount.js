import React, { useEffect, useState } from "react";
import { getAccountBalance } from "../../utils/CommonFunc";

export default function MyAccount({ account, simpleToken }) {
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState(0);

  useEffect(() => {
    if (account && simpleToken) {
      getAccountBalance(account).then((b) => {
        setBalance(b);
      });
      simpleToken.methods
        .balanceOf(account)
        .call()
        .then((tkn) => {
          setToken(tkn);
        });
    }
  }, [account]);

  return (
    <div>
      <h2>My Account</h2>
      <div className="balance d-flex">
        <label>balance : &nbsp;</label>
        <label>{balance}</label>
      </div>
      <div className="balance d-flex">
        <label>token : &nbsp;</label>
        <label>{token}</label>
      </div>
    </div>
  );
}
