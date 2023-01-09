import { FormEvent, useEffect, useState } from 'react'
import trueImg from '../../assets/images/true.png'
import cardImg from '../../assets/images/credit-card.png'
import visa from '../../assets/images/visa.png'
import masterCard from '../../assets/images/MasterCard.png'
import maestro from '../../assets/images/maestro.png'
import americanExpress from '../../assets/images/american-express.png'
import PageTitle from 'components/PageTitle'
import { useNavigate } from 'react-router'

const imagesPath = [cardImg, visa, masterCard, maestro, americanExpress]

export type CheckoutModelProps = {
  p: boolean
  total: number
}

export default function CheckoutModel({ p, total }: CheckoutModelProps) {
  const navigate = useNavigate()
  const [form, setForm] = useState(p)
  const [validity, setValidity] = useState('')
  const [cardNumber, setCardNumber] = useState(0)

  useEffect(() => {
    setForm(p)
  }, [p])

  const validityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const per = validity.concat('/', e.target.value.slice(-1))
    if (validity.length == 2 && !(e.target.value.length === 1)) {
      setValidity(per)
      return
    } else setValidity(e.target.value)
  }

  const cardNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const per = Number(e.target.value.slice(0, 1))
    if (per === 5) setCardNumber(2)
    else if (per === 4) setCardNumber(1)
    else if (per === 6) setCardNumber(3)
    else if (per === 3) setCardNumber(4)
    else setCardNumber(0)
  }

  const buttonHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setForm(false)
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  return (
    <div
      className={
        p
          ? 'w-full h-full bg-translucent fixed flex top-0 left-0  justify-center overflow-hidden'
          : 'hidden'
      }
    >
      <div className="absolute top-1/4 items-center justify-center w-64 h-52 bg-white flex flex-col gap-6">
        <img className="w-20 h-20" src={trueImg} />
        <PageTitle text={'Order is processed'}></PageTitle>
      </div>
      <div className={form ? 'flex items-center w-2/5 z-50' : 'hidden'}>
        <form
          onSubmit={(e) => buttonHandler(e)}
          className="w-full rounded-3xl p-10 bg-white shadow-xl"
        >
          <p className="text-gray-800 font-medium text-xl">Customer information</p>
          <div className="">
            <input
              required
              pattern="^[a-zA-Z]{3,}( [a-zA-Z]{3,})+$"
              className="w-full mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              placeholder="Name and Surname"
            />
          </div>
          <div className="mt-2">
            <input
              required
              pattern="^\+[0-9]{9,}"
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
            />
          </div>
          <div className="mt-2">
            <input
              required
              pattern="^[a-zA-Z]{5,} [a-zA-Z]{5,}( [a-zA-Z]{5,})+$"
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="address"
              name="address"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="mt-2">
            <input
              required
              pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <p className="mt-4 text-gray-800 text-xl font-medium">Payment information</p>
          <div className=" mt-4 flex items-center w-full">
            <img src={imagesPath[cardNumber]} className="h-10 w-10" />
            <div className="ml-3 grow">
              <input
                required
                className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
                pattern="[0-9]{16}"
                onChange={(e) => cardNumberHandler(e)}
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="Card Number"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="">
              <input
                required
                pattern="^(?:[0-1][1-2])\/(?:[0-2]\d|3[0-1])$"
                value={validity}
                onChange={(e) => validityHandler(e)}
                maxLength={5}
                className="w-2/3 mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
                id="validity"
                name="validity"
                type="text"
                placeholder="Validity"
              />
            </div>
            <div className="flex justify-end">
              <input
                required
                pattern="^[0-9]{3}$"
                maxLength={3}
                className="w-1/3 mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
                id="cvv"
                name="cvv"
                type="text"
                placeholder="CVV"
                aria-label="Name"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
            >
              ${total}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
