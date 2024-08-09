import AuthButtons from './AuthButtons'

export default function LoginData({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  passwordInputRef,
  handleGeneratePassword,
}) {
  return (
    <form className="flex flex-col items-center space-y-4 rounded-lg bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">Log in or register</h2>
      <label htmlFor="email" className="text-lg text-gray-800">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="password" className="text-lg text-gray-800">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        ref={passwordInputRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-64 rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showPassword"
          checked={showPassword}
          onChange={toggleShowPassword}
          className="h-4 w-4 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="showPassword" className="text-gray-800">
          Show password
        </label>
      </div>
      <AuthButtons email={email} password={password} />
      <button
        type="button"
        onClick={handleGeneratePassword}
        className="mt-2 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      >
        Generate a password
      </button>
    </form>
  )
}
