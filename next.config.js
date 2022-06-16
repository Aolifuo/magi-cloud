/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const onElectron = true;

const commonConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    onElectron,
    requestBaseUrl: 'http://localhost:3000',
  }
}

const prodConfig = {
  assetPrefix: onElectron ? './' : '',
  env: {
    iconPrefix: onElectron ? './icons' : '/icons',
  }
}

const devConfig = {
  env: {
    iconPrefix: '/icons',
  }
}

const nextConfig = Object.assign(commonConfig, isProd ? prodConfig : devConfig)

module.exports = nextConfig
