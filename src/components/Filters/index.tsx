import DualRange from 'components/DualRange'
import useFilters from './useFilters'

function Filters() {
  const p = useFilters()

  return (
    <>
      <button onClick={p.onReset}>Reset Filters</button>
      <h3 className="font-semibold">Category</h3>
      <div className="flex flex-col mb-4 overflow-y-scroll max-h-54 px-1">
        {p.categories.map((category) => (
          <label key={category} className="flex flex-row items-center">
            <input
              type="checkbox"
              name="category"
              value={category}
              checked={p.isChecked('category', category)}
              onChange={p.onFilterChange}
            />
            &nbsp;<div className="first-letter:capitalize">{category}</div>
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Brands</h3>
      <div className="flex flex-col mb-4 overflow-y-scroll max-h-52 px-1">
        {p.brands.map((brand) => (
          <label key={brand} className="flex flex-row items-center">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={p.isChecked('brand', brand)}
              onChange={p.onFilterChange}
            />
            &nbsp;<div className="first-letter:capitalize">{brand}</div>
          </label>
        ))}
      </div>

      <h3 className="font-semibold">Price</h3>
      <DualRange
        name="price"
        defaultMin={p.getDefaultRangeValue('price', 'min')}
        defaultMax={p.getDefaultRangeValue('price', 'max')}
        min={p.priceRange.min}
        max={p.priceRange.max}
        onChange={p.onRangeChange}
      />

      <h3 className="font-semibold">Stock</h3>
      <DualRange
        name="stock"
        defaultMin={p.getDefaultRangeValue('stock', 'min')}
        defaultMax={p.getDefaultRangeValue('stock', 'max')}
        min={p.stockRange.min}
        max={p.stockRange.max}
        onChange={p.onRangeChange}
      />
    </>
  )
}

export default Filters
