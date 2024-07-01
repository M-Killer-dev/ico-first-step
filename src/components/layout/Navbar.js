import React from "react";

export default function Navbar({ setAccount, accounts, account }) {
  const handleAccountChange = (e) => {
    if (e.target.value) setAccount(e.target.value);
  };
  return (
    <div className="nav nav-bar d-flex justify-content-between bg-light">
      <select name="accounts" onChange={handleAccountChange}>
        <option value=""></option>
        {accounts &&
          accounts.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
      </select>
      <div className="selected-account">
        <label>Selected : &nbsp;</label>
        <label>{account}</label>
      </div>
    </div>
  );
}
