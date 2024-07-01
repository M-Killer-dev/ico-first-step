import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import SimpleToken from "../abis/SimpleToken.json";
import TokenSale from "../abis/TokenSale.json";
import Navbar from "./layout/Navbar";
import MyAccount from "./pages/MyAccount";
import ContractInfo from "./pages/ContractInfo";
import TokenSaleInfo from "./pages/TokenSaleInfo";
import ContractLog from "./pages/ContractLog";
import SimpleTokenActions from "./pages/SimpleTokenActions";

const App = () => {
  const [simpleToken, setSimpleToken] = useState();
  const [tokenSale, setTokenSale] = useState();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const _accounts = await web3.eth.getAccounts();
    setAccounts(_accounts);

    const networkId = await web3.eth.net.getId();
    const simpleTokenContractAddress = SimpleToken.networks[networkId].address;
    const simpleTkn = new web3.eth.Contract(
      SimpleToken.abi,
      simpleTokenContractAddress
    );
    setSimpleToken(simpleTkn);

    const tokenSaleContractAddress = TokenSale.networks[networkId].address;
    const tknSale = new web3.eth.Contract(
      TokenSale.abi,
      tokenSaleContractAddress
    );
    setTokenSale(tknSale);
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navbar account={account} accounts={accounts} setAccount={setAccount} />
      <ContractInfo simpleToken={simpleToken} />
      <TokenSaleInfo account={account} tokenSale={tokenSale} />
      <MyAccount account={account} simpleToken={simpleToken} />
      <SimpleTokenActions
        account={account}
        accounts={accounts}
        simpleToken={simpleToken}
      />
      <ContractLog simpleToken={simpleToken} tokenSale={tokenSale} />
    </div>
  );
};

export default App;
