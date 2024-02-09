import { useEffect, useState } from 'react'

function useCurrency(currency) {
  let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [currency, url])
  return data[currency]
}

export default useCurrency
