import Image from 'next/image'
import Link from 'next/link'

export default function SuccessSignUpForm() {
  return (
    <>
      <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
        <div className="flex h-full w-full shrink-0 flex-col items-center bg-background px-5 pb-0 pt-5 md:w-[400px] lg:w-[480px]">
          <Link href="/" className="mb-10">
            <Image src="/biblevis-logo.svg" alt="biblevis logo" width={181} height={45} />
          </Link>
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto">
            <Image src="/mail.svg" alt="Confirmation Mail Icon" width={72} height={72} />
            <p className="max-w-80 text-center text-large font-medium">
              Thank you for signing up! We have sent a confirmation email to the address
              you provided. To complete your registration, please check your inbox and
              click on the verification link in the email. This step is necessary to
              verify your account and activate your profile. If you do not receive the
              email within a few minutes, please check your spam or junk folder. For
              further assistance, you can contact our support team.
            </p>
          </div>
        </div>
        <div
          className="hidden h-full w-full bg-cover bg-center md:block"
          style={{ backgroundImage: 'url(/ship.webp)' }}
        ></div>
      </div>
    </>
  )
}
