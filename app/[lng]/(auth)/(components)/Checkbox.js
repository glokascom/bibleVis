const Checkbox = ({ id, checked, onChange, label }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-blue-500 focus:ring-blue-500"
    />
    <label htmlFor={id} className="text-gray-800">
      {label}
    </label>
  </div>
)

export default Checkbox
