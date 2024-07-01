export const getAccountBalance = async (accountAddress) => {
  try {
    const balanceWei = await web3.eth.getBalance(accountAddress);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    return balanceEth;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "Error";
  }
};
