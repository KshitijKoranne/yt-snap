import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          At YT Snap, accessible from <Link href="/" className="text-primary hover:underline">https://yt-snap.com</Link>, 
          one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information 
          that is collected and recorded by YT Snap and how we use it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information we collect</h2>
        <p className="mb-4">
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, 
          will be made clear to you at the point we ask you to provide your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How we use your information</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.
          Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
        <p className="mb-4">
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
          information from anyone under the age of 13. If you are a parent or guardian and you are aware that your 
          child has provided us with Personal Data, please contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page and updating the "effective date" at the bottom of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>By email: support@yt-snap.com</li>
          <li>By visiting the contact section on our website</li>
        </ul>

        <p className="text-sm text-muted-foreground mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 