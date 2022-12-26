import { useCartStore } from 'store/cart'

export default function Header() {
  const itemsInCart = useCartStore((state) => state.count)

  return (
    <header>
      <h1 className="text-1xl font-bold">Online Store</h1>
      <div>Cart: {itemsInCart}</div>
    </header>
  )
}
