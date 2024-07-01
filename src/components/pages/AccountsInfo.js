import React, { useEffect, useState } from "react";
import _ from "lodash";
import { getAccountBalance } from "../../utils/CommonFunc";

export default function AccountsInfo({ accounts, simpleToken }) {
  const [accountsInfo, setAccountsInfo] = useState([]);

  useEffect(() => {
    if (accounts && simpleToken) {
      const promises = accounts.map(async (item, index) => {
        let item_token = await simpleToken.methods.balanceOf(item).call();
        let item_balance = await getAccountBalance(item);
        return {
          account: item,
          token: item_token.toString(),
          balance: item_balance.toString(),
        };
      });
      Promise.all(promises).then((tmp) => {
        setAccountsInfo(tmp);
      });
    }
  }, [accounts, simpleToken]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Account</th>
            <th>Balance</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {accountsInfo &&
            accountsInfo.map((item, index) => (
              <tr key={item.account}>
                <td>{index + 1}</td>
                <td>{item.account}</td>
                <td>{item.balance}</td>
                <td>{item.token}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
