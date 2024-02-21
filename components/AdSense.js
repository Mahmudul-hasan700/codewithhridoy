"use client";
import { useEffect } from "react";

const AdSense = ({ adSlot }) => {
  useEffect(() => {
    if (window && !document.querySelector('.adsbygoogle')) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3227806848574176"
      data-ad-slot="3063566126"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;