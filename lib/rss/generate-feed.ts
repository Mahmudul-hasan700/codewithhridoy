import { Feed } from "feed";
import { getAllPosts, getSettings } from "../sanity/client";

export async function generateRssFeed() {
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
      rss2: `${siteConfig.url}/rss/feed.xml`
    },
    author: {
      name: siteConfig.author,
      email: siteConfig.email
    }
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/post/${post.slug.current}`,
      link: `${siteConfig.url}/post/${post.slug.current}`,
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
