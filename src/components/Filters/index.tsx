import useProducts from 'store/products'

function Filters() {
  const [categories, brands, price, stock] = useProducts((s) => [
    s.categories,
    s.brands,
    s.priceRange,
    s.stockRange
  ])

  return (
    <div className="px-3 py-2 rounded bg-gray-100">
      <h3 className="font-semibold">Category</h3>
      <div className="flex flex-col mb-4">
        {categories.map((category) => (
          <label key={category}>
            <input type="checkbox" name="category" value={category} /> {category}
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Brands</h3>
      <div className="flex flex-col mb-4">
        {brands.map((brand) => (
          <label key={brand}>
            <input type="checkbox" name="brand" value={brand} /> {brand}
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Price</h3>
      <div className="relative h-10">
        <input
          className="w-full rotate-180 accent-purple-600"
          name="price"
          min={price[0]}
          max={price[1]}
          step={1}
          defaultValue={price[1]}
          type="range"
        />
        <input
          className="w-full accent-purple-600"
          name="price"
          min={price[0]}
          max={price[1]}
          step={1}
          type="range"
          defaultValue={price[1]}
        />
      </div>

      <h3 className="font-semibold">Stock</h3>
      <div className="relative h-10">
        <input
          className="w-full rotate-180 accent-purple-600"
          name="stock"
          min={stock[0]}
          max={stock[1]}
          step={1}
          type="range"
          defaultValue={stock[1]}
        />
        <input
          className="w-full accent-purple-600"
          name="stock"
          min={stock[0]}
          max={stock[1]}
          step={1}
          type="range"
          defaultValue={stock[1]}
        />
      </div>
    </div>
  )
}

export default Filters
