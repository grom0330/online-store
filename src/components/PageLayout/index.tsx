/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import shallow from 'zustand/shallow'

import Loader from 'components/Loader'
import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
import useProducts from 'store/products'

export function PageLayout() {
  const [status, error, fetchProducts] = useProducts(
    (state) => [state.status, state.error, state.fetch],
    shallow
  )

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl py-5 px-2 sm:py-10 sm:px-4 lg:max-w-7xl lg:px-6">
        {status === 'loading' && <Loader />}
        {status === 'error' && <div>{error}</div>}
        {status === 'ok' && <Outlet />}
      </div>
      <Footer />
    </>
  )
}
