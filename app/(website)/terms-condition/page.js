// pages/terms.js

import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb title="Terms and Conditions" />

      <h1 className="mb-6 text-3xl font-bold">Terms & Conditions</h1>

      <p className="mb-4">Terms and Conditions of CodingNepal</p>

      <p className="mb-4">
        By accessing and using our website (
        <a
          href="https://codewithhridoy.vercel.app"
          className="text-blue-500 hover:underline">
          https://codewithhridoy.vercel.app
        </a>
        ), you agree to comply with the following terms and
        conditions. If you do not agree with any part of these terms,
        please refrain from using our website.
      </p>

      <h2 className="mb-2 text-xl font-bold">Use of Cookies</h2>
      <p className="mb-4">
        We utilize cookies in accordance with our Privacy Policy.
        Cookies are used to enhance your experience and improve the
        functionality of certain areas on our website. Some
        affiliate/advertising partners may also use cookies.
      </p>

      <h2 className="mb-2 text-xl font-bold">
        Intellectual Property Rights
      </h2>
      <p className="mb-4">
        All materials on CodingNepal, unless otherwise stated, are
        owned by CodingNepal and its licensors, and all intellectual
        property rights are reserved. You may access and use our
        content for personal purposes, but you must not republish,
        sell, rent, reproduce, or redistribute it without our prior
        consent.
      </p>

      <h2 className="mb-2 text-xl font-bold">User Comments</h2>
      <p className="mb-4">
        Certain areas of our website allow users to post and exchange
        opinions and information. Please note that we do not filter or
        review these comments in advance. The views expressed in user
        comments do not necessarily reflect our views, and we are not
        liable for any content users post.
      </p>

      <h2 className="mb-2 text-xl font-bold">
        Hyperlinks to Our Content
      </h2>
      <p className="mb-4">
        Government agencies, search engines, and news organizations
        may link to our website without prior written approval. Other
        organizations may seek approval for hyperlinking based on
        specific criteria, including non-deceptiveness and contextual
        relevance.
      </p>

      <h2 className="mb-2 text-xl font-bold">iFrames</h2>
      <p className="mb-4">
        Creating frames around our web pages that alter the visual
        presentation of our website is not permitted without our prior
        approval.
      </p>

      <h2 className="mb-2 text-xl font-bold">Content Liability</h2>
      <p className="mb-4">
        We are not responsible for any content that appears on
        external websites linking to our site. You agree to defend and
        protect us against any claims arising from the content
        displayed on your website that links to CodingNepal.
      </p>

      <h2 className="mb-2 text-xl font-bold">Privacy</h2>
      <p className="mb-4">
        Please read our Privacy Policy to understand how we handle
        your personal information.
      </p>

      <h2 className="mb-2 text-xl font-bold">
        Reservation of Rights
      </h2>
      <p className="mb-4">
        We reserve the right to request the removal of any link to our
        website and to modify these terms and conditions. By
        continuing to link to our website, you agree to be bound by
        the updated terms and conditions.
      </p>

      <h2 className="mb-2 text-xl font-bold">Disclaimer</h2>
      <p className="mb-4">
        We strive to provide accurate and up-to-date information, but
        we do not warrant the completeness or accuracy of the content
        on our website. Your use of our website is at your own risk,
        and we do not accept liability for any loss or damage
        resulting from it.
      </p>

      <p className="mb-4">
        By accessing and using CodingNepal, you acknowledge and accept
        these terms and conditions. If you have any questions or
        concerns, please{" "}
        <a href="/contact" className="text-blue-500 hover:underline">
          contact us
        </a>
        .
      </p>
    </div>
  );
}
