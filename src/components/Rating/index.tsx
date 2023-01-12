import cx from 'classnames'

import { StarIcon } from '@heroicons/react/20/solid'

type Props = {
  value: number
}

const RANK = [1, 2, 3, 4, 5]

export default function Rating(p: Props) {
  const roundedValue = Math.round(p.value)

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {RANK.map((rating) => (
          <StarIcon
            key={rating}
            className={cx(
              {
                'text-purple-600': roundedValue > rating,
                'text-gray-200': roundedValue < rating
              },
              'h-5 w-5 flex-shrink-0'
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="ml-2">{p.value}</div>
    </div>
  )
}
