import Image from 'next/image'
import Link from 'next/link'

function Social() {
  return (
    <div className="flex items-center justify-between pt-2.5">
      <Link href="https://youtube.com/@levelbible?si=RU5mp2w7xO9QnkFp" target="_blank">
        <Image src="/Youtube.svg" alt="youtube" height={28} width={28} />
      </Link>
      <Link href="https://x.com/bibleviscom" target="_blank">
        <Image
          src="/Twitter.svg"
          alt="twitter"
          className="p-2.5"
          height={32}
          width={32}
        />
      </Link>
      <Link
        href="https://www.instagram.com/biblevis?igsh=MTZieDVmbWw1eDIybw=="
        target="_blank"
      >
        <Image src="/Instagram.svg" alt="instagram" height={28} width={28} />
      </Link>
      <Link href="https://www.facebook.com/profile.php?id=61562437224281" target="_blank">
        <Image src="/Facebook.svg" alt="facebook" height={28} width={28} />
      </Link>
      <Link
        href="https://www.linkedin.com/showcase/biblevis/?viewAsMember=true"
        target="_blank"
      >
        <Image src="/Linkedin.svg" alt="linkedin" height={28} width={28} />
      </Link>
    </div>
  )
}

export default Social
