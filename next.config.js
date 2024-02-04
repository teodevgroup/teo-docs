const withLinaria = require('next-with-linaria')
const withMDX = require('@next/mdx')()

/** @type {import('next-with-linaria').LinariaConfig} */
const config = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
}

module.exports = withMDX(withLinaria(config))