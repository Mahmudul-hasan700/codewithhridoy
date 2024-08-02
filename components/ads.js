"use client";
import React from "react";
import { Adsense } from "@ctrl/react-adsense";

export default function Ads() {
  return (
    <div className="adsbygoogle my-3 text-center">
      <Adsense
        client="ca-pub-3227806848574176"
        slot="5134181954"
        style={{ display: "block", texAlign: "center" }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
}
