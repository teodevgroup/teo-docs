import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'

/** @type {import('unified').Plugin<[], import('hast').Root>} */
const dataCopy = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName == "pre") {
        node.properties['data-copy'] = toString(node.children[0])
      }
    })
  }
}

export default dataCopy
