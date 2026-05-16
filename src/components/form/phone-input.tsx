'use client'

import type { ChangeEvent, KeyboardEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

type PhoneCountry = {
  isoCode: string
  name: string
  flag: string
  dialCode: string
  placeholder: string
}

type PhoneInputProps = {
  label?: string
  countryValue?: string
  numberValue?: string
  onCountryChange: (value: string) => void
  onNumberChange: (value: string) => void
  error?: string
  disabled?: boolean
}

const COUNTRIES: PhoneCountry[] = [
  {
    isoCode: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    dialCode: '+55',
    placeholder: '(11) 99999-9999',
  },
  {
    isoCode: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    placeholder: '(555) 555-5555',
  },
  {
    isoCode: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    dialCode: '+351',
    placeholder: '912 345 678',
  },
]

export function PhoneInput({
  label = 'Phone',
  countryValue = '+55',
  numberValue = '',
  onCountryChange,
  onNumberChange,
  error,
  disabled = false,
}: PhoneInputProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const selectedCountry = useMemo(() => {
    return (
      COUNTRIES.find((country) => country.dialCode === countryValue) ??
      COUNTRIES[0]
    )
  }, [countryValue])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
    onCountryChange(event.target.value)
  }

  function handleCountrySelect(nextDialCode: string) {
    onCountryChange(nextDialCode)
    setIsMenuOpen(false)
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsMenuOpen(true)
    }

    if (event.key === 'Escape') {
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>

      <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            onKeyDown={handleTriggerKeyDown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-full items-center justify-between gap-x-2 rounded-xl border border-slate-700 bg-slate-950 px-3 text-left text-sm font-medium text-slate-100 outline-none transition hover:border-slate-600 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="min-w-0 truncate">
              {selectedCountry.flag} {selectedCountry.name} {selectedCountry.dialCode}
            </span>
            <FiChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          </button>

          {isMenuOpen && !disabled ? (
            <div
              role="listbox"
              aria-label="Country code"
              className="absolute left-0 z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-1 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            >
              {COUNTRIES.map((country) => {
                const isSelected = country.dialCode === selectedCountry.dialCode

                return (
                  <button
                    key={`${country.isoCode}-${country.dialCode}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleCountrySelect(country.dialCode)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? 'bg-green-500/10 text-green-300'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-slate-100'
                    }`}
                  >
                    <span className="min-w-0 truncate">
                      {country.flag} {country.name} {country.dialCode}
                    </span>
                    {isSelected ? (
                      <FiCheck className="h-4 w-4 shrink-0 text-green-300" />
                    ) : null}
                  </button>
                )
              })}
            </div>
          ) : null}

          <select
            value={selectedCountry.dialCode}
            onChange={handleCountryChange}
            disabled={disabled}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0"
          >
            {COUNTRIES.map((country) => (
              <option key={`${country.isoCode}-${country.dialCode}`} value={country.dialCode}>
                {country.flag} {country.name} {country.dialCode}
              </option>
            ))}
          </select>
        </div>

        <input
          value={numberValue}
          onChange={(event) => onNumberChange(event.target.value)}
          disabled={disabled}
          placeholder={`${selectedCountry.dialCode} ${selectedCountry.placeholder}`}
          className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
    </div>
  )
}
