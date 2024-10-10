import { Metadata } from 'next'

import { openGraph } from '../../meta'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Understand how we protect your privacy and manage your data at BibleVis. Read our comprehensive privacy policy',
  openGraph: {
    ...openGraph,
    title: 'Privacy Policy',
    description:
      'Understand how we protect your privacy and manage your data at BibleVis. Read our comprehensive privacy policy',
  },
}

export default function Privacy() {
  return (
    <>
      <section className="mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-sm text-gray-500">Effective Date: 10 October 2024</p>

        <p className="mb-4">
          Thank you for using BibleVis. Your privacy is important to us, and we are
          committed to protecting your personal information. This Privacy Policy explains
          what information we collect, how we use it, and your rights in relation to it.
          By using BibleVis, you agree to the collection and use of your information as
          described in this policy.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">1. Information We Collect</h2>
        <p className="mb-4">We collect the following types of information:</p>
        <ul className="mb-4 list-disc space-y-2 pl-5">
          <li>
            <strong>Personal Information:</strong> When you create an account, submit
            content, or contact us, we may collect personal information such as your name,
            email address, and other contact details.
          </li>
          <li>
            <strong>Usage Information:</strong> We collect data about your interactions
            with BibleVis, such as the pages or features you access, the time and date of
            your visits, and other diagnostic data.
          </li>
          <li>
            <strong>Device Information:</strong> We may collect information about the
            device you use to access BibleVis, including IP address, browser type,
            operating system, and device identifiers.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> We use cookies, web
            beacons, and similar technologies to collect information and improve your
            experience on the Platform. You can choose to disable cookies through your
            browser settings, but some features of the Platform may not function properly
            if cookies are disabled.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-semibold">2. How We Use Your Information</h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="mb-4 list-disc space-y-2 pl-5">
          <li>
            <strong>Provide and Improve the Platform:</strong> We use your information to
            operate and maintain BibleVis, personalize your experience, and improve the
            Platform&apos;s features and content.
          </li>
          <li>
            <strong>Communicate with You:</strong> We may use your contact information to
            send you important updates, respond to your inquiries, and provide customer
            support.
          </li>
          <li>
            <strong>Analyze and Understand Trends:</strong> Usage and device data help us
            monitor and analyze trends, usage patterns, and improve our services.
          </li>
          <li>
            <strong>Marketing and Promotional Purposes:</strong> With your consent, we may
            send you promotional materials and newsletters. You can opt-out of receiving
            these communications at any time.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-semibold">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell your personal information to third parties. However, we may share
          your information in the following circumstances:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-5">
          <li>
            <strong>With Service Providers:</strong> We may share your information with
            third-party service providers who perform services on our behalf, such as
            website hosting, analytics, and email delivery. These providers are obligated
            to keep your information confidential and use it only for the purposes for
            which we have shared it.
          </li>
          <li>
            <strong>For Legal Compliance:</strong> We may disclose your information to
            comply with applicable laws, regulations, legal processes, or governmental
            requests, or to protect the rights, property, and safety of BibleVis, our
            users, or others.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or
            sale of assets, your information may be transferred as part of the
            transaction. We will notify you of any change in ownership or use of your
            personal information.
          </li>
        </ul>

        <h2 className="mb-4 text-2xl font-semibold">4. Security of Your Information</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your
          information from unauthorized access, disclosure, alteration, and destruction.
          However, no method of transmission over the Internet or electronic storage is
          completely secure. While we strive to protect your information, we cannot
          guarantee absolute security.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">5. Your Rights and Choices</h2>
        <p className="mb-4">
          Depending on your location, you may have the following rights regarding your
          personal information:
        </p>
        <ul className="mb-4 list-disc space-y-2 pl-5">
          <li>
            <strong>Access and Update:</strong> You can access and update your personal
            information through your account settings.
          </li>
          <li>
            <strong>Delete Your Data:</strong> You can request the deletion of your
            personal information, and we will comply, subject to any legal obligations to
            retain it.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt-out of receiving marketing
            communications from us by following the instructions in those communications
            or contacting us directly.
          </li>
          <li>
            <strong>Data Portability:</strong> You may have the right to request a copy of
            your personal information in a structured, machine-readable format.
          </li>
        </ul>
        <p className="mb-4">
          If you would like to exercise any of these rights, please contact us at{' '}
          <a href="mailto:support@biblevis.com" className="text-blue-600 underline">
            support@biblevis.com
          </a>
          .
        </p>

        <h2 className="mb-4 text-2xl font-semibold">6. Children’s Privacy</h2>
        <p className="mb-4">
          BibleVis is not intended for children under 13. We do not knowingly collect
          personal information from children under 13. If you are a parent or guardian and
          believe that your child has provided us with personal information, please
          contact us. If we become aware that we have collected personal information from
          a child under 13, we will take steps to delete such information.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">7. International Data Transfers</h2>
        <p className="mb-4">
          BibleVis is operated from the country of Georgia, and your information may be
          transferred to and processed in other countries. If you are accessing the
          Platform from outside the country of Georgia, you consent to the transfer and
          processing of your information in the country of Georgia and other jurisdictions
          where privacy laws may differ.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">8. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our
          practices or legal requirements. We will notify you of any significant changes
          by posting the new policy on the Platform and updating the effective date. Your
          continued use of BibleVis after the changes are posted will constitute your
          acceptance of the updated policy.
        </p>

        <h2 className="mb-4 text-2xl font-semibold">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact
          us at:
        </p>
        <p className="mb-8">
          <a href="mailto:support@biblevis.com" className="text-blue-600 underline">
            support@biblevis.com
          </a>
        </p>

        <p className="mb-4">
          We are committed to protecting your privacy and ensuring that your experience
          with BibleVis is safe, secure, and transparent. Thank you for being a part of
          our community!
        </p>
      </section>
    </>
  )
}
