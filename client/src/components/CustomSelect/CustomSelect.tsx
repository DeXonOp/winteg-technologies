import { useState, useRef, useEffect } from 'react'
import './CustomSelect.css'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  id: string
  value: string
  onChange: (val: string) => void
  options: Option[]
  placeholder: string
  required?: boolean
}

export default function CustomSelect({ id, value, onChange, options, placeholder, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="custom-select-wrapper" ref={dropdownRef}>
      {/* Hidden input to maintain required form validation if needed */}
      <input type="hidden" id={id} value={value} required={required} />
      
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''} ${!value ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="custom-select-icon">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="custom-select-dropdown">
          {options.map((opt) => (
            <div 
              key={opt.value}
              className={`custom-select-option ${value === opt.value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
