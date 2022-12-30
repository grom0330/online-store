type Props = {
  categories: string[]
  brands: string[]
  priceRange: [string, string]
  stockRange: [string, string]
}

function Filters(p: Props) {
  return (
    <div>
      <p>Categories</p>
      {p.categories.map((category) => (
        <label key={category}>
          <input type="checkbox" name="category" value={category} /> {category}
        </label>
      ))}

      <p>Brands</p>
      {p.brands.map((brand) => (
        <label key={brand}>
          <input type="checkbox" name="brand" value={brand} /> {brand}
        </label>
      ))}

      <p>Price</p>
      <input name="price" min={p.priceRange[0]} max={p.priceRange[1]} step={1} type="range" />

      <p>Stock</p>
      <input name="stock" min={p.stockRange[0]} max={p.stockRange[1]} step={1} type="range" />
    </div>
  )
}

export default Filters
