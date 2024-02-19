// pages/privacy-policy.js

import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Breadcrumb title="Privacy policy" />
      <h1 className="mb-4 text-3xl font-semibold">Privacy Policy</h1>

      <h2 className="mb-2 text-xl font-semibold">
        Privacy Policy for CodingNepal
      </h2>
      <p className="mb-4">
        At CodingNepal, we value the privacy of our visitors. This
        Privacy Policy explains how we collect, use, and safeguard
        your information when you visit our website
        (https://codewithhridoy.vercel.app). By using our website, you
        agree to the terms of this Privacy Policy.
      </p>

      <h3 className="mb-2 text-lg font-semibold">
        Information Collection and Use
      </h3>
      <p className="mb-4">
        We may collect personal information such as your name, email
        address, phone number, and any other information you provide
        voluntarily. This information is used to improve our website,
        provide customer service, and deliver updates and promotional
        content.
      </p>

      <h3 className="mb-2 text-lg font-semibold">
        Log Files and Cookies
      </h3>
      <p className="mb-4">
        Like many websites, we use log files and cookies to gather
        non-personal information, such as IP addresses, browser types,
        and the pages you visit. This data helps us analyze trends,
        administer the site, and personalize your browsing experience.
      </p>

      <h3 className="mb-2 text-lg font-semibold">
        Advertising Partners and Third Parties
      </h3>
      <p className="mb-4">
        Some third-party advertising partners may use cookies and
        similar technologies to display personalized ads. We have no
        control over these cookies and recommend reviewing the
        respective Privacy Policies of these advertisers for more
        information.
      </p>

      <h3 className="mb-2 text-lg font-semibold">Your Rights</h3>
      <p className="mb-4">
        Under the CCPA and GDPR, you can access, correct, or delete
        your data. You can also request that we restrict or stop
        processing your information. To exercise any of these rights,
        please contact us.
      </p>

      <h3 className="mb-2 text-lg font-semibold">
        Children's Information
      </h3>
      <p className="mb-4">
        We do not knowingly collect personal information from children
        under 13. If you believe your child has provided such
        information on our website, please get in touch with us, and
        we will promptly remove it from our records.
      </p>

      <h3 className="mb-2 text-lg font-semibold">Contact Us</h3>
      <p>
        Please{" "}
        <a href="/contact" className="text-blue-500">
          contact us
        </a>{" "}
        if you have any questions or need further information about
        our Privacy Policy
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
