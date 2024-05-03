import { Metadata } from "next";
import "@/styles/tailwind.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { urlForImage } from "@/lib/sanity/image";
import Script from "next/script";
import { Toaster } from 'sonner'
import { ThemeProvider } from "@/components/theme-provider";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "codewithhridoy",
  url: "https://codewithhridoy.vercel.app",
  description:
    "A coding blog by Hridoy, covering topics such as programming tutorials, coding tips, and software development insights.",
  publisher: {
    "@type": "Organization",
    name: "CodeWithHridoy",
    logo: {
      "@type": "ImageObject",
      url: "/icon.png"
    }
  },
  author: {
    "@type": "Person",
    name: "Hridoy"
  },
  image: {
    "@type": "ImageObject",
    url: "/opengraph.jpeg",
    width: 1200,
    height: 630
  },
  keywords: [
    "coding",
    "programming",
    "web development",
    "software engineering"
  ],
  inLanguage: "en-US"
};

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, "scroll-smooth")}>
      <script
        src="https://apis.google.com/js/platform.js"
        async
        defer></script>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3227806848574176"
        crossOrigin="anonymous"></script>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className="bg-background mx-auto max-w-screen-lg overflow-x-hidden font-sans antialiased ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >
          
            <Navbar {...settings} />
            <div className="mt-24">{children}</div>
            <Analytics />
            <SpeedInsights />
          <Toaster richColors position="top-center" />
            <Footer {...settings} />
          
        </ThemeProvider>
      </body>
    </html>
  );
}

export const revalidate = 86400;
