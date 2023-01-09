import { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import qs from 'query-string'

import useProducts from 'store/products'
import useCart from 'store/cart'

export type CartLocationState = {
  shouldOpenCheckoutModal: boolean
  productToAdd: { id: number; price: number } | null
}

const DEFAULT_LOCATION_STATE: CartLocationState = {
  shouldOpenCheckoutModal: false,
  productToAdd: null
}

export default function useCartPage() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const cart = useCart()
  const products = useProducts((s) => s.byId)

  const locationState = (location.state as CartLocationState) || DEFAULT_LOCATION_STATE

  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(
    locationState.shouldOpenCheckoutModal
  )

  useEffect(() => {
    window.onbeforeunload = function () {
      window.history.replaceState({}, document.title)
    }

    return () => {
      window.onbeforeunload = null
    }
  }, [])

  const handleCheckout = () => {
    setCheckoutModalVisible(true)
  }

  function ratingClassNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = qs.parse(searchParams.toString())
    query = { ...query, limit: e.target.value, page: '1' }
    const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })
    setSearchParams(params)
  }

  const handlePageChange = (idx: number) => {
    let query = qs.parse(searchParams.toString(), { parseNumbers: true })
    query = { ...query, page: idx }
    const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })
    setSearchParams(params)
  }

  const pageLimit = Number(searchParams.get('limit')) || 3
  const currentPage = Number(searchParams.get('page')) || 1

  const itemsOnPage = cart.ids.slice(
    (currentPage - 1) * pageLimit,
    (currentPage - 1) * pageLimit + pageLimit
  )

  return {
    cart,
    pageLimit,
    products,
    itemsOnPage,
    currentPage,
    isCheckoutModalVisible,
    ratingClassNames,
    handleLimitChange,
    handlePageChange,
    handleCheckout
  }
}
