import Link from 'next/link'

const SocialAuthButton = ({ href, className, children }) => (
  <Link
    href={href}
    className={`flex items-center justify-center rounded-md px-4 py-2 text-white ${className}`}
  >
    {children}
  </Link>
)

export default SocialAuthButton
