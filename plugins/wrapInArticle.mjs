import { u } from 'unist-builder'


/** @type {import('unified').Plugin<[], import('hast').Root>} */
const wrapInArticle = () => {
  return (tree) => {
    console.log("wrap: ", tree.children.length)
    // tree.children = [
    //   u("element", {
    //     "tagName": "article"
    //   }, tree.children)
    // ]
    // tree.children = []
    return tree
  }
}

export default wrapInArticle
