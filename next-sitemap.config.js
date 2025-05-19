/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://jirehgrp.com',
  generateRobotsTxt: true, // Generate robots.txt automatically
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [], // Add paths to exclude if needed
};
