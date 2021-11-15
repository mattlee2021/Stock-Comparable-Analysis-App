const SimilarStockApi = (props) => {
  const similarStocks = fetch(
    "https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/recommendationsbysymbol/" +
      props.ticker,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "stock-data-yahoo-finance-alternative.p.rapidapi.com",
        "x-rapidapi-key": "80ad986cb5mshcabba16d2878f8fp14dca4jsn61fd4cc10485",
      },
    }
  ) // ALERT POPS UP WHEN REFRESHING THE PAGE
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No similar companies can be obtained for this stock.");
      }
    })
    .then((data) => {
      console.log(data.finance.result[0].recommendedSymbols);
      return data.finance.result[0].recommendedSymbols;
    })
    .catch((error) => {
      alert(error);
    });

  return <div>hi</div>;
};

export default SimilarStockApi;
