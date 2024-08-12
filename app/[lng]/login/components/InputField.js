import React from 'react'

const InputField = React.forwardRef(function InputField(
  { id, name, type, required, label, value, onChange },
  ref
) {
  return (
    <>
      <label htmlFor={id} className="text-lg text-gray-800">
        {label}:
      </label>
      <input
        id={id}
        name={name}
        type={type}
        ref={ref}
        required={required}
        value={value}
        onChange={onChange}
        className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </>
  )
})

export default InputField
