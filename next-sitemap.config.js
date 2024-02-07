/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || "http://codewithhridoy.vercel.app/",
  generateRobotsTxt: true // (optional)
  // ...other options
};
