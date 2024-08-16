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

  return (
    <div className="relative w-full max-w-md rounded-lg border-black bg-white">
      <div
        ref={tagsContainerRef}
        onClick={handleContainerClick}
        className="flex h-28 max-h-56 flex-wrap items-start overflow-y-auto rounded-lg border border-black px-2 py-1 pb-1 text-black focus-within:ring-2 focus-within:ring-blue-500"
      >
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className="mb-1 ml-2 mt-1 flex items-center gap-2.5 rounded-lg bg-gray-200 px-5 py-2.5 text-black"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="flex h-6 w-6 items-start justify-center rounded-full bg-black text-lg font-black leading-none text-white hover:bg-gray-800"
            >
              &times;
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
          className="mb-2 ml-2 flex-grow rounded-lg border-none pt-4 align-middle text-black focus:outline-none focus:ring-0"
          style={{ width: `${inputValue.length + 1}ch` }}
        />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-56 overflow-y-auto rounded-lg border border-black bg-white p-2 text-black shadow-lg">
          <div className="flex flex-wrap gap-2.5">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => addTag(suggestion)}
                className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 px-5 py-2.5 text-black hover:bg-gray-300"
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
