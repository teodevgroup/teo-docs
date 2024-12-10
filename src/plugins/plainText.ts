import { visit } from 'unist-util-visit'
import { Plugin } from 'unified'
import { Root } from 'hast'

const compiler = (tree: any) => {
    const parts = []
    visit(tree, 'text', function (node) {
        parts.push(node.value)
    })
    return parts.join('')
}

const plainText: Plugin<[], Root> = function () {
    this.compiler = compiler
}
  
export default plainText
  