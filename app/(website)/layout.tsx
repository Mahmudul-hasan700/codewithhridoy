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
import Head from 'next/head';

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

  const websiteSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "Codewithhridoy",
    "url": settings?.url || "https://www.codewithhridoy.com/",
    "description": "Creative Coding Blog - HTML CSS & JavaScript.",
    "author": {
      "@type": "Person",
      "name": "Hridoy"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Codewithhridoy",
      "logo": {
        "@type": "ImageObject",
        "url": urlForImage(settings?.logo)?.src || "URL_TO_YOUR_LOGO",
        "width": 600,
        "height": 60
      }
    },
    "sameAs": [
      "https://twitter.com/Codewithhridoy"
    ]
  };

  return (
    <GoogleOAuthProvider clientId="685077013953-i9i1hjtrg91ap9indvgrn2n32s2p57ei.apps.googleusercontent.com">
      <html
        lang="en"
        suppressHydrationWarning
        className={cx(inter.variable, lora.variable, "scroll-smooth")}
      >  
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </Head>
        <body className="max-w-screen-lg mx-auto text-gray-800 antialiased bg-white dark:bg-gray-900 dark:text-slate-300">
          <Providers>
            <Navbar {...settings} />
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer {...settings} />
          </Providers>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}

export const revalidate = 86400;