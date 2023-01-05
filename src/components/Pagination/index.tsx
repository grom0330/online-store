import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

type Props = {
  length: number
  limit: number
  current: number
  onChange(idx: number): void
}

export default function Pagination(p: Props) {
  const pagesCount = Math.ceil(p.length / p.limit)

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 mb-2">
            Showing{' '}
            <span className="font-medium">{p.length ? p.limit * p.current - p.limit + 1 : 0}</span>{' '}
            to{' '}
            <span className="font-medium">
              {p.limit * p.current > p.length ? p.length : p.limit * p.current}
            </span>
            &nbsp;of <span className="font-medium">{p.length}</span> results
          </p>

          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => p.onChange(p.current - 1)}
              disabled={p.current <= 1}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {[...Array(pagesCount).keys()].map((i) => {
              if (i + 1 === p.current) {
                return (
                  <button
                    key={i}
                    onClick={() => p.onChange(i + 1)}
                    aria-current="page"
                    className="relative inline-flex items-center border px-4 py-2 text-sm font-medium z-10 text-indigo-600  border-indigo-500 bg-indigo-50"
                  >
                    {p.current}
                  </button>
                )
              }

              if (pagesCount > 9 && i === 3) {
                return (
                  <span
                    key={i}
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                )
              }

              if ((pagesCount > 9 && i === 2) || (pagesCount > 9 && i === pagesCount - 3)) {
                return (
                  <button
                    key={i}
                    onClick={() => p.onChange(i + 1)}
                    aria-current="page"
                    className="hidden md:inline-flex relative items-center border px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 border-gray-300 bg-white text-gray-500"
                  >
                    {i + 1}
                  </button>
                )
              }

              if (pagesCount > 9 && i > 3 && i < pagesCount - 2) {
                return null
              }

              return (
                <button
                  key={i}
                  onClick={() => p.onChange(i + 1)}
                  aria-current="page"
                  className="relative inline-flex items-center border px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 border-gray-300 bg-white text-gray-500"
                >
                  {i + 1}
                </button>
              )
            })}

            <button
              disabled={p.current >= pagesCount}
              onClick={() => p.onChange(p.current + 1)}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
