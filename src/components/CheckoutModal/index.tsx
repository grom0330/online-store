export type CheckoutModelProps = {
  p: boolean
  total: number
}

export default function CheckoutModel({ p, total }: CheckoutModelProps) {
  return (
    <div
      className={
        p
          ? 'w-full h-full bg-translucent fixed flex top-0 left-0  justify-center overflow-hidden'
          : 'hidden'
      }
    >
      <div className="flex items-center w-2/5">
        <form className="w-full rounded-3xl p-10 bg-white shadow-xl">
          <p className="text-gray-800 font-medium text-xl">Customer information</p>
          <div className="">
            <input
              required
              className="w-full mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              placeholder="Name and Surname"
            />
          </div>
          <div className="mt-2">
            <input
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
            />
          </div>
          <div className="mt-2">
            <input
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="address"
              name="address"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="mt-2">
            <input
              className="w-full px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <p className="mt-4 text-gray-800 text-xl font-medium">Payment information</p>
          <div className="">
            <input
              className="w-full mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              placeholder="Card Number"
              aria-label="Name"
            />
          </div>
          <div className="flex justify-between">
            <div className="">
              <input
                className="w-2/3 mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                placeholder="Validity"
                aria-label="Name"
              />
            </div>
            <div className="flex justify-end">
              <input
                className="w-1/3 mt-4 px-2 py-1 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                placeholder="CVV"
                aria-label="Name"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
              type="submit"
            >
              ${total}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
