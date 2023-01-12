import { memo, useEffect, useState, useRef, useCallback } from 'react'

import './index.css'

type Props = {
  name: string
  defaultMin?: number
  defaultMax?: number
  min: number
  max: number
  onChange(data: { name: string; min: number; max: number }): void
}

// TODO: refactor
const DualRange = (p: Props) => {
  const [minVal, setMinVal] = useState(p.defaultMin || p.min)
  const [maxVal, setMaxVal] = useState(p.defaultMax || p.max)
  const minValRef = useRef(p.defaultMin || p.min)
  const maxValRef = useRef(p.defaultMax || p.max)
  const range = useRef<HTMLInputElement>(null)

  const getPercent = useCallback(
    (value: number) => Math.round(((value - p.min) / (p.max - p.min)) * 100),
    [p.min, p.max]
  )

  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  const handleChange = (min: number, max: number) => {
    p.onChange({ name: p.name, min, max })
  }

  return (
    <div className="range__container">
      <input
        type="range"
        min={p.min}
        max={p.max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1)
          setMinVal(value)
          minValRef.current = value
          handleChange(value, maxVal)
        }}
        className="range__thumb range__thumb--left"
        style={{ zIndex: minVal > p.max - 100 ? '5' : undefined }}
      />
      <input
        type="range"
        min={p.min}
        max={p.max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1)
          setMaxVal(value)
          maxValRef.current = value
          handleChange(minVal, value)
        }}
        className="range__thumb range__thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div>
      </div>
    </div>
  )
}

export default memo(DualRange)
