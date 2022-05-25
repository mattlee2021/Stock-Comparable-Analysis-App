const FetchStockNames = (event, setSuggestedResults) => {
  return fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=ZY9GZNYZQM8C1MQC`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      const result = [];
      const maxResults =
        data.bestMatches.length >= 5 ? 5 : data.bestMatches.length;
      for (let index = 0; index < maxResults; index++) {
        let key = index;
        console.log(data.bestMatches);
        if (
          data.bestMatches[key]["1. symbol"] &&
          data.bestMatches[key]["2. name"]
        ) {
          console.log("data match", [
            data.bestMatches[key]["1. symbol"],
            data.bestMatches[key]["2. name"],
          ]);
          setSuggestedResults((prev) => [
            ...prev,
            [
              data.bestMatches[key]["1. symbol"],
              data.bestMatches[key]["2. name"],
            ],
          ]);
          result.push([
            data.bestMatches[key]["1. symbol"],
            data.bestMatches[key]["2. name"],
          ]);
        }
      }
      console.log("result", result);
      return result;
    })
    .catch((e) => {
      console.log(e);
    });
};

export default FetchStockNames;
