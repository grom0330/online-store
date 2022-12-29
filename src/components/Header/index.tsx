import useCartStore from 'store/cart'
import imgBag from '../../assets/images/shopping-bags.png'
import imgCart from '../../assets/images/shopping-cart.png'

export default function Header() {
  const itemsInCart = useCartStore((state) => state.count)

  return (
    <header className="flex justify-center ">
      <div className="flex justify-between items-center w-7xl m-3 border-b-2 p-4 border-purple-600">
        <div className="flex items-center gap-2">
          <img className="w-12 h-12" src={imgBag} />
          <div className="text-purple-600 text-4xl font-bold font-philosopher">Online store</div>
        </div>
        <div className="items-center text-purple-600 text-2xl font-normal font-philosopher">
          Cart total: 2342
        </div>
        <div className="flex gap-4 items-center">
          <img className="w-12 h-12" src={imgCart} />
          <div className="w-8 text-purple-600 text-3xl font-normal font-philosopher">
            {itemsInCart}
          </div>
        </div>
      </div>
    </header>
  )
}
