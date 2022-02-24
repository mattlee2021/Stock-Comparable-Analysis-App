const FetchStocks = (ticker, applyData, similarStockRequest) => {
  fetch(
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
      ticker +
      "&apikey=ZY9GZNYZQM8C1MQC"
  ) //Amherst Key ZY9 GZN YZQ M8C 1MQC
    //TD8ZNN64UTNOK6DA
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
      if (
        data.Name === undefined &&
        data.Note !== undefined &&
        !similarStockRequest
      ) {
        throw new Error(
          "You hit the rate limit of 5 stock requests per minute. Please wait another minute before adding new stocks."
        );
      } else if (data.Name === undefined && similarStockRequest) {
        return;
      } else if (data.Name === undefined) {
        throw new Error("Invalid Ticker");
      }

      applyData(
        {
          Ticker: data.Symbol,
          Name: data.Name,
          "P/E": data.PERatio,
          "P/B": data.PriceToBookRatio,
          EPS: data.EPS,
          "EV/EBITDA": data.EVToEBITDA,
          "EV/Revenue": data.EVToRevenue,
          "Profit Margin": data.ProfitMargin,
          Sector: data.Sector,
        },
        similarStockRequest
      );
    })
    .catch((error) => {
      alert(error);
    });
};

export default FetchStocks;
