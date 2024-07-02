import React, { useEffect, useState } from "react";

export default function TokenSaleActions({ account, accounts, tokenSale }) {
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();

  const addToWhiteList = () => {
    if (tokenSale && selectedAccount && account) {
      tokenSale.methods.addToWhiteList(selectedAccount).send({ from: account });
    }
  };

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };

  useEffect(() => {
    if (tokenSale && account) {
      tokenSale.methods
        .isWhitelisted(account)
        .call()
        .then((status) => {
          setIsWhitelisted(status);
        });
    }
  }, [tokenSale, account]);

  return (
    <div className="d-flex">
      <div className="whitelist">
        <label>In Whitelist : &nbsp;</label> {isWhitelisted ? "Yes" : "No"}
      </div>
      <div>
        <select name="accounts" onChange={handleSelectAccount}>
          <option value="null"></option>
          {accounts &&
            accounts.map((item, index) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <button className="btn btn-primary" onClick={addToWhiteList}>
          Add to Whitelist
        </button>
      </div>
    </div>
  );
}
