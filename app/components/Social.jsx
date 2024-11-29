import Image from 'next/image'
import Link from 'next/link'

function Social() {
  return (
    <div className="flex items-center">
      <Link href="https://youtube.com/@levelbible?si=RU5mp2w7xO9QnkFp">
        <Image src="/Youtube.svg" alt="youtube" />
      </Link>
      <Link href="https://x.com/bibleviscom">
        <Image src="/Twitter.svg" alt="twitter" className="p-2" />
      </Link>
      <Link href="https://www.instagram.com/biblevis?igsh=MTZieDVmbWw1eDIybw==">
        <Image src="/Instagram.svg" alt="instagram" />
      </Link>
      <Link href="https://www.facebook.com/profile.php?id=61562437224271">
        <Image src="/Facebook.svg" alt="facebook" />
      </Link>
      <Link href="https://www.linkedin.com/showcase/biblevis/?viewAsMember=true">
        <Image src="/Linkedin.svg" alt="linkedin" />
      </Link>
    </div>
  )
}

export default Social
