import React from 'react'

const InputField = React.forwardRef(function InputField({ id, label, ...props }, ref) {
  return (
    <>
      <label htmlFor={id} className="text-lg text-gray-800">
        {label}:
      </label>
      <input
        id={id}
        ref={ref}
        {...props}
        className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  )
})

export default InputField
