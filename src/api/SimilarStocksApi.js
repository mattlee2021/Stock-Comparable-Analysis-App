const SimilarStocksApi = (ticker) => {
  //const [similarStockList, setSimilarStockList] = useState([]);
  /*
  1. Take ticker and fetch similar stock
  2. Store similar stock symbols in an array
  3. loop through the symbol array return stockData that gets sent to StockApi
  */

  return fetch(
    "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/recommendationsbysymbol/" +
      ticker,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "x-rapidapi-key": "80ad986cb5mshcabba16d2878f8fp14dca4jsn61fd4cc10485",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No similar companies can be obtained for this stock.");
      }
    })
    .then((similarStock) => {
      console.log(
        "SimilarStock",
        similarStock.finance.result[0].recommendedSymbols
      );
      return similarStock.finance.result[0].recommendedSymbols;
    })
    .catch((error) => {
      alert(error);
    });
};

export default SimilarStocksApi;
