import withLinaria from 'next-with-linaria'
import mdx from '@next/mdx'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import onThisPage from './src/plugins/onThisPage'
import dataCopy from './src/plugins/dataCopy'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeMdxTitle from 'rehype-mdx-title'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { getSingletonHighlighter, bundledLanguagesInfo } from 'shiki'
import { createCssVariablesTheme } from 'shiki/core'
import generateCaches from './src/scripts/generateCaches'
import breadcrumb from './src/plugins/breadcrumb'
import tableOfContents from './src/plugins/tableOfContents'
import prevNext from './src/plugins/prevNext'
import { readFileSync } from 'fs'

generateCaches()

let withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkToc, remarkGfm, remarkFrontmatter
    ],
    rehypePlugins: [
      rehypeMdxTitle,
      rehypeSlug,
      [rehypePrettyCode, {
        theme: 'css-variables',
        addLanguageClass: true,
        onVisitLine(node) {
          // Prevent lines from collapsing in `display: grid` mode, and
          // allow empty lines to be copy/pasted
          if (node.children.length === 0) {
            node.children = [{type: 'text', value: ' '}]
          }
        },
        // Feel free to add classNames that suit your docs
        onVisitHighlightedLine(node) {
          if (node.properties.className) {
            node.properties.className.push('highlighted')
          } else {
            node.properties.className = ['highlighted']
          }
        },
        onVisitHighlightedWord(node) {
          node.properties.className = ['word']
        },
        getHighlighter: (options) => getSingletonHighlighter({
          ...options,
          themes: [createCssVariablesTheme({ 
            name: 'css-variables',
            variablePrefix: '--shiki-',
            variableDefaults: {},
            fontStyle: true
          })],
          langs: [
            ...bundledLanguagesInfo.map((lang) => lang.id),
            () => JSON.parse(readFileSync("./langs/teo.json", "utf-8")),
          ],
        }),
      }],
      dataCopy,
      tableOfContents,
      prevNext,
      breadcrumb,
      onThisPage
    ],
    recmaPlugins: [recmaNextjsStaticProps],
  },
})

/** @type {import('next-with-linaria').LinariaConfig} */
const config = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverActions: {
      allowedOrigins: ['docs.teodev.io', 'docs.teodevgroup.io', 'docker-teo-docs']
    }
  }
  // webpack: (
  //   config,
  //   { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  // ) => {
  //   if (!config.module) {
  //     config.module = {}
  //   }
  //   if (!config.module.rules) {
  //     config.module.rules = []
  //   }
  //   config.module.rules.push({
  //     test: /\.node$/,
  //     loader: "native-ext-loader"
  //   })
  //   return config
  // }
}

export default withMDX(withLinaria(config) as any)