import { Metadata } from "next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@/styles/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { urlForImage } from "@/lib/sanity/image";
import Head from "next/head";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export async function sharedMetaData(params) {
  const settings = await getSettings();

  return {
    title: {
      default:
        settings?.title ||
        "Codewithhridoy | Creative Coding Blog - HTML CSS & JavaScript."
    },
    description:
      settings?.description ||
      "Explore innovative HTML, CSS, and JavaScript tutorials at Codewithhridoy, your go-to creative coding blog for insightful tips and tricks.",
    keywords: [
      "Creative coding",
      "HTML tutorials",
      "CSS tricks",
      "JavaScript techniques",
      "Web development tips",
      "Coding blog",
      "Frontend development",
      "Web design inspiration",
      "Code tutorials",
      "Programming resources",
      "Next.js",
      "Sanity",
      "Tailwind CSS",
      "Coding",
      "Webdeveloper",
      "Webdeveloping",
      "codewithhridoy"
    ],
    authors: [{ name: "Hridoy" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/opengraph.jpeg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title:
        settings?.title ||
        "Codecrafthub | Creative Coding Blog - HTML CSS & JavaScript",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <GoogleOAuthProvider clientId="685077013953-i9i1hjtrg91ap9indvgrn2n32s2p57ei.apps.googleusercontent.com">
      <html
        lang="en"
        suppressHydrationWarning
        className={cx(
          inter.variable,
          lora.variable,
          "scroll-smooth"
        )}>
        <body className="mx-auto max-w-screen-lg bg-white text-gray-800 antialiased dark:bg-gray-900 dark:text-slate-300">
          <Providers>
            <Navbar {...settings} />
            <div className="mt-24">{children}</div>
            <Analytics />
            <SpeedInsights />
            <Footer {...settings} />
          </Providers>
        </body>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3227806848574176"
          crossOrigin="anonymous"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
        />
        <Script
          data-ad-client="ca-pub-3227806848574176"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
      </html>
    </GoogleOAuthProvider>
  );
}

export const revalidate = 86400;
