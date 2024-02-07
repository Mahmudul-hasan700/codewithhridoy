// ShareButton.js
"use client";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  XIcon
} from "react-share";

export default function ShareButton({ title, url }) {
  return (
    <div className="flex flex-wrap gap-3">
      <FacebookShareButton url={url} quote={title}>
        <button className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <FacebookIcon size={24} round={true} /> Facebook
        </button>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <button className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <XIcon size={24} round={true} />
          Twitter
        </button>
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <button className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
          <WhatsappIcon size={24} round={true} />
          Whatsapp
        </button>
      </WhatsappShareButton>
    </div>
  );
}
