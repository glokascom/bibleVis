'use client'

import React, { useState } from 'react'

export default function TagInput({ suggestionCount = 5, initialTags = [] }) {
  const [inputValue, setInputValue] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [allTags, setAllTags] = useState(initialTags)

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
          .slice(0, suggestionCount)
      )
    } else {
      setSuggestions([])
    }
  }

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
      if (!allTags.includes(tag)) {
        setAllTags([...allTags, tag])
      }
    }
    setInputValue('')
    setSuggestions([])
  }

  const removeTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTag(inputValue.trim())
      e.preventDefault()
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex flex-wrap items-center rounded-lg border border-gray-300 px-2 py-1 text-black focus-within:ring-2 focus-within:ring-blue-500">
        {selectedTags.map((tag, index) => (
          <div
            key={index}
            className="mb-1 mr-1 flex items-center space-x-1 rounded-lg bg-gray-700 px-2 py-1 text-white"
          >
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-grow rounded-lg border-none text-black focus:outline-none focus:ring-0"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-40 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 text-black shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => addTag(suggestion)}
                className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-300"
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
