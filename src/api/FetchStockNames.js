const FetchStockNames = (input) => {
  return fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=ZY9GZNYZQM8C1MQC`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      const result = [];
      const maxResults = data.bestMatches
        ? data.bestMatches.length >= 5
          ? 5
          : data.bestMatches.length
        : 0;
      for (let index = 0; index < maxResults; index++) {
        let key = index;

        if (
          data.bestMatches[key]["1. symbol"] &&
          data.bestMatches[key]["2. name"]
        ) {
          result.push([
            data.bestMatches[key]["1. symbol"],
            data.bestMatches[key]["2. name"],
          ]);
        }
      }
      return result;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default FetchStockNames;
