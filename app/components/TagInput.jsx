'use client'

import { useEffect, useRef, useState } from 'react'

export default function TagInput({
  initialTags = [],
  suggestionCount,
  allowAddOnEnter = true,
  limitLetters = 20,
  limitLettersAllTags = 250,
  onTagsChange = () => {},
}) {
  const [inputValue, setInputValue] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [allTags, setAllTags] = useState(initialTags)
  const tagsContainerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    onTagsChange(allTags)
  }, [allTags, onTagsChange])

  const scrollToBottom = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollTop = tagsContainerRef.current.scrollHeight
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    if (value) {
      setSuggestions(
        allTags
          .filter(
            (tag) =>
              tag.toLowerCase().includes(value.toLowerCase()) &&
              !selectedTags.includes(tag)
          )
          .slice(0, suggestionCount === undefined ? allTags.length : suggestionCount)
      )
    } else {
      setSuggestions([])
    }
  }

  const addTag = (tag) => {
    const totalChars = selectedTags.join('').length + tag.length

    if (tag.length > limitLetters || totalChars > limitLettersAllTags) {
      return
    }

    if (!selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => [...prevTags, tag])
      setAllTags((prevTags) => (prevTags.includes(tag) ? prevTags : [...prevTags, tag]))
    }
    setInputValue('')
    setSuggestions([])
    setTimeout(() => {
      scrollToBottom()
      inputRef.current?.focus()
    }, 0)
  }

  const removeTag = (tag) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.filter((t) => t !== tag)
      setAllTags((prevAllTags) =>
        prevAllTags.includes(tag) && !newTags.includes(tag)
          ? prevAllTags.filter((t) => t !== tag)
          : prevAllTags
      )
      return newTags
    })
    setTimeout(() => {
      scrollToBottom()
      inputRef.current?.focus()
    }, 0)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      if (allowAddOnEnter) {
        addTag(inputValue.trim())
      }
      e.preventDefault()
    } else if (e.key === 'Backspace' && inputValue === '') {
      if (selectedTags.length > 0) {
        removeTag(selectedTags[selectedTags.length - 1])
      }
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (inputRef.current && inputRef.current.scrollIntoView) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedTags])

  return (
    <div className="relative w-full max-w-md cursor-text rounded-medium">
      <div
        ref={tagsContainerRef}
        onClick={handleContainerClick}
        className="rounded-medium border border-gray-100 p-5 text-small font-[500] focus-within:ring-1 focus-within:ring-secondary"
      >
        <div className="flex h-28 flex-wrap items-start gap-2.5 overflow-y-auto pr-2.5">
          {selectedTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 rounded-medium bg-gray-200 px-5 py-2.5 text-small font-[500]"
            >
              <span>{tag}</span>
              <button
                aria-label={`delete ${tag}`}
                onClick={() => removeTag(tag)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary leading-none text-white hover:bg-gray-800"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L5 5M8 8L5 5M5 5L8 2L2 8"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          <input
            ref={inputRef}
            data-testid="tag-input"
            value={inputValue}
            placeholder={
              selectedTags.length === 0
                ? `up to ${limitLettersAllTags} letters total, separated by commas`
                : ''
            }
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow rounded-medium border-none py-2.5 align-middle text-small font-[500] focus:outline-none focus:ring-0"
            style={{ width: `${inputValue.length + 1}ch` }}
          />
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-medium border border-secondary bg-white p-5 text-small font-[500] shadow-lg">
          <div className="flex max-h-56 flex-wrap gap-2.5 overflow-y-auto pr-2.5">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => addTag(suggestion)}
                className="flex cursor-pointer items-center justify-center rounded-medium bg-gray-200 px-5 py-2.5 text-small font-[500] hover:bg-gray-300"
              >
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
