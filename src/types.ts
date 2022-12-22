type CardId = { _idFor: Card['id'] }

export type Card = {
  id: string
  mainImg: string
  images: string
  price: string
  title: string
  companyName: string
  companyImg: string
  createdAt: Date
}
