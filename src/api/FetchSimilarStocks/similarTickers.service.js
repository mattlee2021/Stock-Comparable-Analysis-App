import FetchStocks from "../FetchStocks/stockData.service";

const FetchSimilarStocks = (ticker) => {
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
    .then(async (data) => {
      const similarStocks = data.finance.result[0].recommendedSymbols;
      /*
       data.finance.result[0].recommendedSymbols returns an array of 5 similar stocks in order from most similar (index 0) to less similar (index 4),
       so we are limiting the number of similar stocks by 1 to have a total of 4 stocks sent to FetchStocks(). 
       Therefore, for every similar stock request we will have the original stock request and 4 similar stock requests 
       for a total of 5 stock requests for FetchStocks. There is a max of 5 stock requests/minute. 
       */
      const result = [];
      for (let i = 0; i < similarStocks.length; i++) {
        const similarStockData = await FetchStocks(similarStocks[i].symbol);
        result.push(similarStockData);
      }
      return result;
    })
    .catch((error) => {
      alert(error);
    });
};

export default FetchSimilarStocks;