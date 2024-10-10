import { Metadata } from 'next'

import { openGraph } from '../../meta'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Review the terms and conditions governing your use of BibleVis. Stay informed about our guidelines and policies',
  openGraph: {
    ...openGraph,
    title: 'Terms of Service',
    description:
      'Review the terms and conditions governing your use of BibleVis. Stay informed about our guidelines and policies',
  },
}

export default function Tos() {
  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p>
        Welcome to BibleVis! These Terms of Service (&quot;Terms&quot;) govern your access
        to and use of the BibleVis platform, website, and services (&quot;Platform&quot;).
        By using the Platform, you agree to these Terms. If you do not agree, you may not
        use the Platform. Please read them carefully.
      </p>

      <h2 className="mt-6 text-xl font-semibold">1. Acceptance of Terms</h2>
      <p>
        By accessing or using BibleVis, you confirm that you have read, understood, and
        agree to be bound by these Terms and any additional guidelines, policies, or rules
        provided by BibleVis.
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Use of the Platform</h2>
      <p>
        <strong>Eligibility:</strong> You must be at least 13 years old to use BibleVis.
        By using the Platform, you affirm that you are 13 or older, or if under 18, that
        you have the consent of a parent or guardian.
      </p>
      <p>
        <strong>Permitted Use:</strong> BibleVis grants you a non-exclusive,
        non-transferable, and revocable license to access and use the Platform for
        personal, non-commercial purposes. You may not use the Platform to infringe upon
        the rights of others or violate any applicable laws.
      </p>
      <p>
        <strong>Prohibited Activities:</strong> You agree not to:
      </p>
      <ul className="list-inside list-disc">
        <li>
          Modify, copy, distribute, or create derivative works based on the Platform
          without permission.
        </li>
        <li>Use the Platform for unlawful purposes.</li>
        <li>Reverse-engineer or extract source code from the Platform.</li>
        <li>Upload or transmit any harmful content, viruses, or spam.</li>
      </ul>

      <h2 className="mt-6 text-xl font-semibold">3. Content Ownership and Licensing</h2>
      <p>
        <strong>BibleVis Content:</strong> All images, texts, graphics, logos, and other
        content provided on BibleVis (&quot;BibleVis Content&quot;) are owned or licensed
        by BibleVis. You may use BibleVis Content for personal, educational,
        non-commercial, or commercial purposes, provided that proper attribution is given
        to BibleVis.
      </p>
      <p>
        <strong>User-Generated Content:</strong> If you contribute content to BibleVis
        (including but not limited to AI-generated images, text, and reviews), you retain
        ownership of your content. By submitting, you grant BibleVis a worldwide,
        non-exclusive, royalty-free license to use, display, reproduce, and distribute
        your content on the Platform.
      </p>
      <p>
        <strong>Community Contributions:</strong> BibleVis may allow users to share and
        distribute their images under open licenses, such as Creative Commons. Please
        respect the terms of these licenses when using community content.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Privacy Policy</h2>
      <p>
        Your privacy is important to us. Our Privacy Policy explains how we collect, use,
        and protect your personal information when you use BibleVis. By using the
        Platform, you agree to our collection and use of information as outlined in the
        Privacy Policy.
      </p>

      <h2 className="mt-6 text-xl font-semibold">
        5. Disclaimers and Limitation of Liability
      </h2>
      <p>
        <strong>No Warranties:</strong> BibleVis is provided &quot;as is&quot; and
        &quot;as available&quot; without any warranties of any kind, either express or
        implied. We do not guarantee that the Platform will be error-free, uninterrupted,
        or free from harmful components.
      </p>
      <p>
        <strong>Limitation of Liability:</strong> To the fullest extent permitted by law,
        BibleVis, its officers, directors, employees, and affiliates shall not be liable
        for any indirect, incidental, special, or consequential damages resulting from
        your use of or inability to use the Platform, even if we have been advised of the
        possibility of such damages.
      </p>

      <h2 className="mt-6 text-xl font-semibold">6. Termination</h2>
      <p>
        We reserve the right to terminate or suspend your access to the Platform at our
        sole discretion, with or without notice, for conduct that we believe violates
        these Terms or is harmful to other users or the Platform.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Changes to the Terms</h2>
      <p>
        BibleVis may update these Terms from time to time. We will notify you of any
        significant changes by posting the new Terms on our Platform. Your continued use
        of the Platform after changes have been made will constitute your acceptance of
        the updated Terms.
      </p>

      <h2 className="mt-6 text-xl font-semibold">8. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at:</p>
      <p>
        Email:{' '}
        <a href="mailto:support@biblevis.com" className="text-blue-600 underline">
          support@biblevis.com
        </a>
      </p>

      <p>
        By using BibleVis, you acknowledge that you have read and understood these Terms
        and agree to be bound by them. Thank you for being part of the BibleVis community!
      </p>
    </div>
  )
}
