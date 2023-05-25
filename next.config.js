/** @type {import('next').NextConfig} */

// next.config.js
module.exports = {
  env: {
    'MYSQL_HOST': '170.64.148.234',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': 'data-and-dragons',
    'MYSQL_USER': 'QueryUser',
    'MYSQL_PASSWORD': 'PqMssmrVMOY1bg8p',
  },

  nextConfig: {
    reactStrictMode: true,
  }
}

