import { visit } from 'unist-util-visit'
import { toString } from 'hast-util-to-string'
import { Plugin } from 'unified'
import { Root } from 'hast'

const dataCopy: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName == "pre") {
        node.properties['data-copy'] = toString(node.children[0])
      }
    })
  }
}

export default dataCopy
