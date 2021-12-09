import useStockApi from "./useStockApi";
import { useEffect, useState } from "react";

const useSimilarStockApi = () => {
  const [similarStocks, setSimilarStocks] = useState([]);

  const useSimilarStocksFetch = (ticker) => {
    useEffect(() => {
      fetch(
        "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
          ticker +
          "&apikey=TD8ZNN64UTNOK6DA",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "stock-data-yahoo-finance-alternative.p.rapidapi.com",
            "x-rapidapi-key":
              "80ad986cb5mshcabba16d2878f8fp14dca4jsn61fd4cc10485",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(
              "No similar companies can be obtained for this stock."
            );
          }
        })
        .then((data) => {
          console.log(
            "Retrieved Data",
            data.finance.result[0].recommendedSymbols
          );
          setSimilarStocks(data.finance.result[0].recommendedSymbols);
        })
        .catch((error) => {
          alert(error);
        });
    }, [ticker]);
  };

  return { useSimilarStocksFetch, similarStocks };
};

export default useSimilarStockApi;
