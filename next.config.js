/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  serverExternalPackages: ['imap', 'nodemailer'],
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;