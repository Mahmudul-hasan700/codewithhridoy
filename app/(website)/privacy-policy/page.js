import Head from 'next/head';
import Container from '@/components/container';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Your Website Name</title>
        <meta name="description" content="Your website's privacy policy." />
      </Head>
      <Container>
        <h1 className="text-center text-xl font-semibold mb-3">Privacy Policy</h1>
        <p>This is the privacy policy of Your Website Name.</p>
        <p>We take your privacy seriously. Here's what you need to know:</p>
        <ul className="list-disc list-inside divide-y ">
          <li>We collect only the minimum amount of personal information necessary for the functioning of our website.</li>
          <li>We do not share your personal information with third parties unless required by law.</li>
          <li>We use cookies and similar technologies to improve your browsing experience.</li>
          <li>You can adjust your browser settings to refuse cookies, but this may affect the functionality of our website.</li>
        </ul>
        <p>If you have any questions about our privacy policy, please contact us.</p>
      </Container>
    </>
  );
}