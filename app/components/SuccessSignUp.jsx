import Image from 'next/image'
import Link from 'next/link'

export default function SuccessSignUpForm() {
  return (
    <>
      <div className="z-50 flex h-[90vh] w-[90vw] flex-row overflow-hidden rounded-medium">
        <Link href="/success-sign-up">Log in</Link>
        <div className="flex h-full w-full shrink-0 flex-col items-center bg-background px-14 pb-0 pt-5 md:w-[400px] lg:w-[480px]">
          <Link href="/" className="mb-10">
            <Image src="/biblevis-logo.svg" alt="biblevis logo" width={181} height={45} />
          </Link>
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-auto">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.21094 21.1823L36.0001 35.5751L64.7893 21.1823C64.6828 19.3479 63.8789 17.6237 62.5423 16.3627C61.2057 15.1018 59.4376 14.3996 57.6001 14.3999H14.4001C12.5626 14.3996 10.7945 15.1018 9.45798 16.3627C8.12141 17.6237 7.31751 19.3479 7.21094 21.1823Z"
                fill="#10CD87"
              />
              <path
                d="M64.8002 29.2249L36.0002 43.6249L7.2002 29.2249V50.4001C7.2002 52.3096 7.95876 54.141 9.30903 55.4912C10.6593 56.8415 12.4906 57.6001 14.4002 57.6001H57.6002C59.5098 57.6001 61.3411 56.8415 62.6914 55.4912C64.0416 54.141 64.8002 52.3096 64.8002 50.4001V29.2249Z"
                fill="#10CD87"
              />
            </svg>
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
