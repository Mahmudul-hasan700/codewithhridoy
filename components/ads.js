import React from "react";
import { Adsense } from "@ctrl/react-adsense";

function Ads() {
  return (
    <div className="text-center adsbygoogle my-3">
      <Adsense
        client="ca-pub-3227806848574176"
        slot="use-your-slot-id-here"
        style={{ display: "block" }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
}