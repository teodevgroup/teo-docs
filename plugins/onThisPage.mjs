import { visit } from 'unist-util-visit'

/** @type {import('unified').Plugin<[], import('hast').Root>} */
const onThisPage = () => {
  return (tree) => {
    let h2H3List = {
      type: "element",
      tagName: "ul",
      children: []
    }
    let originalChildren = tree.children
    visit(tree, 'element', (node) => {
      if (node.tagName == "h2" || node.tagName == "h3")  {
        h2H3List.children.push({
          type: "element",
          tagName: "li",
          properties: {
            class: node.tagName
          },
          children: [{
            type: "element",
            tagName: "a",
            properties: {
              href: `#${node.properties.id}`
            },
            children: node.children
          }]
        })
      }
    })
    let original = {
      type: "element",
      tagName: "article",
      children: originalChildren
    }
    let onThisPage = {
      type: "element",
      tagName: "aside",
      children: h2H3List.children.length > 0 ? [
        {
          type: "element",
          tagName: "triple",
        },
        {
          type: "element",
          tagName: "div",
          properties: {
            class: "title"
          },
          children: [
            {
              type: 'text',
              value: 'On this page'
            }
          ]
        },
        h2H3List
      ] : [
        {
          type: "element",
          tagName: "triple",
        }
      ]
    };
    tree.children = [original, onThisPage]
  }
}

export default onThisPage
