const FetchStocks = (ticker, applyData) => {
  fetch(
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
      ticker +
      "&apikey=TD8ZNN64UTNOK6DA"
  )
    .then((response) => {
      console.log("Got a response,", response);
      if (response) {
        console.log("Sending a response");
        return response.json();
      } else {
        console.log("Reached rate limit");
        throw new Error("Error here!!");
      }
    })
    .then((data) => {
      console.log("New Data,", data);
      if (data.Name === undefined && data.Note !== undefined) {
        throw new Error(
          "You hit the rate limit of 5 stock requests per minute. Please wait another minute before adding new stocks."
        );
      } else if (data.Name === undefined) {
        throw new Error("Invalid Ticker");
      }

      applyData(
        {
          Ticker: data.Symbol, //Change to Ticker Context
          Name: data.Name,
          "P/E": data.PERatio,
          EPS: data.EPS,
          "P/B": data.PriceToBookRatio,
          "Profit Margin": data.ProfitMargin,
          Sector: data.Sector,
        },
        false
      );
    })
    .catch((error) => {
      alert(error);
    });

  return {
    FetchStocks,
  };
};

export default FetchStocks;
