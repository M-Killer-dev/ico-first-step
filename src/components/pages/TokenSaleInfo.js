import React, { useState, useEffect } from "react";

export default function TokenSaleInfo({ account, accounts, tokenSale }) {
  const [minContribLimit, setMinContribLimit] = useState(0);
  const [maxContribLimit, setMaxContribLimit] = useState(0);
  const [hardcap, setHardcap] = useState(0);
  const [presaleEndsDate, setPresaleEndsDate] = useState("");
  const [weiRased, setWeiRased] = useState(0);
  const [whitelist, setWhitelist] = useState([]);

  useEffect(() => {
    if (account && accounts && tokenSale) {
      tokenSale.methods
        .minContribLimit()
        .call()
        .then((minLimit) => {
          setMinContribLimit(minLimit.toString());
        });

      tokenSale.methods
        .maxContribLimit()
        .call()
        .then((maxLimit) => {
          setMaxContribLimit(maxLimit.toString());
        });

      tokenSale.methods
        .hardCap()
        .call()
        .then((hcap) => {
          setHardcap(hcap.toString());
        });

      tokenSale.methods
        .presaleEndsDate()
        .call()
        .then((date) => {
          setPresaleEndsDate(date.toString());
        });

      tokenSale.methods
        .weiRased()
        .call()
        .then((wei) => {
          setWeiRased(wei.toString());
        });

      const promises = accounts.map(async (item, index) => {
        let inWhitelist = await tokenSale.methods.isWhitelisted(item).call();
        return inWhitelist ? item : null;
      });
      Promise.all(promises).then((tmp) => {
        setWhitelist(tmp);
      });
    }
  }, [account, accounts]);
  return (
    <div>
      <h2>TokenSale Contract Info</h2>
      <div className="d-flex">
        <label>minContribLimit : &nbsp;</label>
        <label>{minContribLimit}</label>
      </div>
      <div className="d-flex">
        <label>maxContribLimit : &nbsp;</label>
        <label>{maxContribLimit}</label>
      </div>
      <div className="d-flex">
        <label>hardcap : &nbsp;</label>
        <label>{hardcap}</label>
      </div>
      <div className="d-flex">
        <label>presaleEndsDate : &nbsp;</label>
        <label>{presaleEndsDate}</label>
      </div>
      <div className="d-flex">
        <label>weiRased : &nbsp;</label>
        <label>{weiRased}</label>
      </div>
      <div className="d-flex flex-column">
        <label>whitelist : &nbsp;</label>
        {whitelist.map((item, index) => (
          <label key={index}>{item}</label>
        ))}
      </div>
    </div>
  );
}
