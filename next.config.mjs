import withLinaria from 'next-with-linaria'
import mdx from '@next/mdx'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import onThisPage from './plugins/onThisPage.mjs'
import dataCopy from './plugins/dataCopy.mjs'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeMdxTitle from 'rehype-mdx-title'
import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { getSingletonHighlighter, bundledLanguagesInfo } from 'shiki'
import { createCssVariablesTheme } from 'shiki/core'
import generateCaches from './scripts/generateCaches.mjs'
import { search } from '@teocloud/teo-docs-search-engine'
import { fetchPrevNext, fetchToc } from './scripts/generateToc.mjs'
import breadcrumb from './plugins/breadcrumb.mjs'
import { fetchBreadcrumb } from './scripts/generateBreadcrumb.mjs'
import tableOfContents from './plugins/tableOfContents.mjs'
import prevNext from './plugins/prevNext.mjs'
import { readFileSync } from 'fs'

generateCaches()

global.docSearch = (text) => {
  return search(text)
}

global.docFetchToc = (urlPath) => {
  return fetchToc(urlPath)
}

global.docFetchBreadcrumb = (urlPath) => {
  return fetchBreadcrumb(urlPath)
}

global.docFetchPrevNext = (urlPath) => {
  return fetchPrevNext(urlPath)
}

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
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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

export default withMDX(withLinaria(config))