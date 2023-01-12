import { useMemo, useCallback, useEffect, useState } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import qs from 'query-string'

import useProducts from 'store/products'
import useCart from 'store/cart'

export type CartLocationState = {
  shouldOpenCheckoutModal: boolean
}

const DEFAULT_LOCATION_STATE: CartLocationState = {
  shouldOpenCheckoutModal: false
}

export default function useCartPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const cart = useCart()
  const products = useProducts((s) => s.byId)

  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(
    ((location.state as CartLocationState) || DEFAULT_LOCATION_STATE).shouldOpenCheckoutModal
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

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let query = qs.parse(searchParams.toString())
    query = { ...query, limit: e.target.value, page: '1' }
    const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })
    setSearchParams(params)
  }

  const handlePageChange = useCallback(
    (idx: number) => {
      let query = qs.parse(searchParams.toString(), { parseNumbers: true })
      query = { ...query, page: idx }
      const params = qs.stringify(query, { skipEmptyString: true, skipNull: true })
      navigate(`/cart?${params}`, { replace: true })
    },
    [searchParams, navigate]
  )

  const pagination = useMemo(() => {
    const pageLimit = Number(searchParams.get('limit')) || 3
    const currentPage = Number(searchParams.get('page')) || 1
    const totalPages = Math.ceil(cart.ids.length / pageLimit)

    const itemsOnPage = cart.ids.slice(
      (currentPage - 1) * pageLimit,
      (currentPage - 1) * pageLimit + pageLimit
    )

    return {
      pageLimit,
      itemsOnPage,
      currentPage,
      totalPages
    }
  }, [searchParams, cart.ids])

  useEffect(() => {
    const page = Number(searchParams.get('page'))

    if (page > 0 && page > pagination.totalPages) {
      handlePageChange(pagination.totalPages)
    }

    if (Number(searchParams.get('page')) <= 0) {
      handlePageChange(1)
    }
  }, [searchParams, pagination.currentPage, pagination.totalPages, handlePageChange])

  return {
    cart,
    products,
    ...pagination,
    isCheckoutModalVisible,
    handleLimitChange,
    handlePageChange,
    handleCheckout
  }
}
