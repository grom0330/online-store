import { StarIcon } from '@heroicons/react/20/solid'

type Props = {
  value: number
}

export default function Rating(p: Props) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={classNames(
              Math.round(p.value) > rating ? 'text-purple-600' : 'text-gray-200',
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
