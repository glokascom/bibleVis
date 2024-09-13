'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export default function TagInput({
  label,
  suggestionCount,
  placeholder = '',
  initialValue = '',
  initialTags = [],
  limitLetters = 0,
  isTagInput = true,
  showCounter = true,
  isSmallHeight = false,
  allowAddOnEnter = true,
  limitLettersAllTags = 250,
  onTagsChange = () => {},
  onBlur = () => {},
  isAIGeneration = false,
}) {
  const [inputValue, setInputValue] = useState(isTagInput ? '' : initialValue)
  const [selectedTags, setSelectedTags] = useState(isTagInput ? initialValue : [])
  const [suggestions, setSuggestions] = useState([])
  const [allTags, setAllTags] = useState(initialTags)
  const tagsContainerRef = useRef(null)
  const inputRef = useRef(null)

  const totalChars =
    selectedTags.reduce((acc, t) => acc + t.name.length, 0) + inputValue.length

  useEffect(() => {
    onTagsChange({ allTags, selectedTags })
  }, [allTags, onTagsChange, selectedTags])

  const handleBlur = () => {
    if (allowAddOnEnter && isTagInput && inputValue.trim()) {
      addTagsFromInput(inputValue)
    }

    onBlur({
      value: isTagInput ? selectedTags : inputValue,
      allTags,
      selectedTags,
    })
  }

  const scrollToBottom = () => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollTop = tagsContainerRef.current.scrollHeight
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (!isTagInput && value.length <= limitLettersAllTags) {
      setInputValue(value)
    } else if (isTagInput) {
      setInputValue(value)
    }
    updateSuggestions(value, selectedTags)
  }

  const filterTagsByType = useCallback(() => {
    if (label === 'Software Used') {
      return allTags.filter((tag) =>
        isAIGeneration ? tag.type === 'ai' : tag.type === 'manual'
      )
    }
    return allTags
  }, [label, isAIGeneration, allTags])

  const updateSuggestions = useCallback(
    (value, currentSelectedTags) => {
      const filteredTags = filterTagsByType().filter(
        (tag) => !currentSelectedTags.some((t) => t.id === tag.id)
      )

      if (value) {
        setSuggestions(
          filteredTags
            .filter((tag) => tag.name.toLowerCase().includes(value.toLowerCase()))
            .slice(
              0,
              suggestionCount === undefined ? filteredTags.length : suggestionCount
            )
        )
      } else {
        setSuggestions(
          filteredTags.slice(
            0,
            suggestionCount === undefined ? filteredTags.length : suggestionCount
          )
        )
      }
    },
    [filterTagsByType, suggestionCount]
  )

  useEffect(() => {
    if (inputValue.trim()) {
      updateSuggestions(inputValue, selectedTags)
    } else {
      setSuggestions([])
    }
  }, [isAIGeneration, inputValue, selectedTags, filterTagsByType])

  const addTagsFromInput = (input) => {
    const tagsToAdd = input
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    setSelectedTags((prevSelectedTags) => {
      const newTags = tagsToAdd
        .filter((tag) => !prevSelectedTags.some((t) => t.name === tag))
        .map((tag) => ({ id: generateId(), name: tag }))
      const updatedTags = [...prevSelectedTags, ...newTags]
      return updatedTags
    })

    setInputValue('')
  }

  const addTag = (tag) => {
    const totalChars =
      selectedTags.reduce((acc, t) => acc + t.name.length, 0) + tag.name.length

    if (
      (limitLetters > 0 && tag.name.length > limitLetters) ||
      totalChars > limitLettersAllTags
    ) {
      return
    }

    if (!tag.id) {
      tag.id = generateId()
    }

    if (!selectedTags.some((t) => t.id === tag.id)) {
      const newSelectedTags = [...selectedTags, tag]
      setSelectedTags(newSelectedTags)
      setAllTags((prevTags) =>
        prevTags.some((t) => t.id === tag.id) ? prevTags : [...prevTags, tag]
      )

      updateSuggestions('', newSelectedTags)
    }
    setInputValue('')

    setTimeout(() => {
      scrollToBottom()
      inputRef.current?.focus()
    }, 0)
  }

  useEffect(() => {
    if (inputValue.trim()) {
      updateSuggestions(inputValue, selectedTags)
    } else {
      setSuggestions([])
    }
  }, [allTags, selectedTags, inputValue, updateSuggestions])

  const removeTag = (tag) => {
    const newSelectedTags = selectedTags.filter((t) => t.id !== tag.id)
    setSelectedTags(newSelectedTags)

    setAllTags(() => {
      const uniqueTags = [...new Set([...initialTags, ...newSelectedTags])]
      return uniqueTags
    })

    updateSuggestions(inputValue, newSelectedTags)
    scrollToBottom()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (!isTagInput) return

    if (e.key === 'Enter' && inputValue.trim()) {
      if (allowAddOnEnter) {
        addTagsFromInput(inputValue)
      }
      e.preventDefault()
    } else if (e.key === 'Backspace' && inputValue === '') {
      if (selectedTags.length > 0) {
        removeTag(selectedTags[selectedTags.length - 1])
        setSuggestions([])
      }
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
    if (isTagInput) {
      updateSuggestions(inputValue, selectedTags)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tagsContainerRef.current && !tagsContainerRef.current.contains(event.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (inputRef.current && inputRef.current.scrollIntoView) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedTags])

  return (
    <div className="relative w-full cursor-text">
      {label && (
        <label className="mb-4 block text-small">
          <span className="font-bold">{label}</span>{' '}
          {showCounter && (
            <span>
              {totalChars}/{limitLettersAllTags}
            </span>
          )}
        </label>
      )}
      <div
        ref={tagsContainerRef}
        onClick={handleContainerClick}
        onBlur={handleBlur}
        className="rounded-medium border border-secondary-50 bg-secondary-50 p-5 text-small font-medium focus-within:ring-1 focus-within:ring-secondary"
      >
        <div
          className={`flex ${
            isSmallHeight ? '' : 'h-[6.125rem]'
          } flex-wrap content-start items-start gap-2.5 overflow-y-auto`}
        >
          {isTagInput ? (
            <>
              {selectedTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2.5 rounded-medium bg-secondary-100 px-5 py-2.5 text-small"
                >
                  <span>{tag.name}</span>
                  <button
                    aria-label={`delete ${tag.name}`}
                    onClick={() => removeTag(tag)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary leading-none text-white hover:opacity-hover"
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
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    ? placeholder ||
                      `Up to ${limitLettersAllTags} letters total, separated by commas`
                    : ''
                }
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-grow border-none bg-secondary-50 py-3 text-small placeholder:text-secondary-200 focus:outline-none focus:ring-0"
                style={{ width: `${inputValue.length + 1}ch` }}
              />

              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-10 mt-2.5 rounded-medium border border-secondary bg-secondary-50 p-5 text-small shadow-small">
                  <div className="flex max-h-56 flex-wrap gap-2.5 overflow-y-auto pr-2.5">
                    {suggestions.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => addTag(tag)}
                        className="flex cursor-pointer items-center justify-center rounded-medium bg-secondary-100 px-5 py-2.5 text-small hover:bg-secondary-200"
                      >
                        <span>{tag.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <textarea
              ref={inputRef}
              data-testid="text-input"
              value={inputValue}
              placeholder={placeholder || `up to ${limitLettersAllTags} letters total`}
              onChange={handleInputChange}
              className={`placeholder:text-secondary-200 ${
                isSmallHeight ? 'content-center leading-3' : ''
              } h-full w-full flex-grow resize-none border-none bg-secondary-50 text-small focus:outline-none focus:ring-0`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
