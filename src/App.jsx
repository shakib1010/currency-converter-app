import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrency from './hooks/useCurrency'
const backgroundImage =
  'https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=600'

function App() {
  const [amount, setAmount] = useState("")
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('bdt')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const currencyInfo = useCurrency(from)
  const options = currencyInfo && Object.keys(currencyInfo)

  const onSwap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const onConvert = () => {
    if(typeof amount === "string") return
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onChangeAmount={setAmount}
                defaultCurrency={from}
                currencyList={options}
                onChangeCurrency={setFrom}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={onSwap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                defaultCurrency={to}
                currencyList={options}
                onChangeCurrency={setTo}
                isAmountDisable={true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              onClick={onConvert}
            >
              Convert ({from} to {to})
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
