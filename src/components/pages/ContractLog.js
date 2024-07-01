import React, { useEffect, useState } from "react";

export default function ContractLog({ simpleToken, tokenSale }) {
  const [sTokenEvents, setSTokenEvents] = useState([]);
  const [tSaleEvents, setTSaleEvents] = useState([]);

  useEffect(() => {
    if (simpleToken) {
      simpleToken
        .getPastEvents("allEvents", {
          fromBlock: 0, // Start block
          toBlock: "latest", // End block
        })
        .then((events) => {
          console.log(events);
          setSTokenEvents(events);
        });
    }

    if (tokenSale) {
      tokenSale
        .getPastEvents("allEvents", {
          fromBlock: 0, // Start block
          toBlock: "latest", // End block
        })
        .then((events) => {
          console.log(events);
          setTSaleEvents(events);
        });
    }
  }, []);

  return (
    <>
      <h2>Contract Logs</h2>
      <div className="bg-primary">
        <h4>SimpleToken</h4>
        {sTokenEvents.map((item, index) => (
          <label key={index}>{item}</label>
        ))}
      </div>
      <div className="bg-secondary">
        <h4>TokenSale</h4>
        {tSaleEvents.map((item, index) => (
          <label key={index}>{item}</label>
        ))}
      </div>
    </>
  );
}
