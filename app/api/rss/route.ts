// File: app/api/rss/route.js

import { Feed } from "feed";
import { getAllPosts, getSettings } from "@/lib/sanity/client";

async function generateRssFeed() {
  const posts = await getAllPosts();
  const siteConfig = await getSettings();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    image: `${siteConfig.url}/favicon.ico`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.title}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`
    },
    author: {
      name: siteConfig.author,
      email: siteConfig.email
    }
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/blog/${post.slug}`,
      link: `${siteConfig.url}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.content,
      author: [
        {
          name: post.author.name,
          email: post.author.email
        }
      ],
      date: new Date(post.date)
    });
  });

  return feed.rss2();
}

export async function GET() {
  const feed = await generateRssFeed();
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
