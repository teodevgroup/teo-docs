import { visit } from 'unist-util-visit'

const compiler = (tree) => {
    const parts = []
    visit(tree, 'text', function (node) {
        parts.push(node.value)
    })
    return parts.join('')
}

/** @type {import('unified').Plugin<[], import('hast').Root>} */
const plainText = function (options) {
    this.compiler = compiler
}
  
export default plainText
  