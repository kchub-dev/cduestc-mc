"use client";

import { siteConfig } from "@/content/site";
import Script from "next/script";

declare global {
  interface Window {
    LA?: {
      init: (options: {
        id: string;
        ck: string;
        autoTrack?: boolean;
        hashMode?: boolean;
      }) => void;
    };
  }
}

/**
 * 51.la JS SDK Pro. `hashMode` enables Vue/React SPA route tracking.
 * @see https://v6.51.la/
 */
export function La51Analytics() {
  const { id, ck } = siteConfig.la51;

  return (
    <Script
      id="LA_COLLECT"
      src="https://sdk.51.la/js-sdk-pro.min.js"
      strategy="afterInteractive"
      charSet="UTF-8"
      onLoad={() => {
        window.LA?.init({
          id,
          ck,
          autoTrack: true,
          hashMode: true,
        });
      }}
    />
  );
}
