import { visit } from 'unist-util-visit'

const childrenItems = (children) => {
    return children.map((child) => {
        const result = {
            "type": "element",
            "tagName": "li",
            "children": [
                {
                    "type": "element",
                    "tagName": "a",
                    "properties": {
                        "href": child.urlPath
                    },
                    "children": [
                        {
                            "type": "text",
                            "value": child.title
                        }
                    ]
                },
            ]
        }
        if (child.children.length) {
            result.children.push({
                "type": "element",
                "tagName": "ul",
                "children": childrenItems(child.children)
            })
        }
        return result
    })
}

/** @type {import('unified').Plugin<[], import('hast').Root>} */
const tableOfContents = () => {
  return (tree, vfile) => {
    visit(tree, (node) => node.type == "mdxJsxFlowElement" && node.name === "TableOfContents", (node) => {
        const urlPath = vfile.path.replace(vfile.cwd, '').replace(/^\/src\/app/, '').replace(/\/page.mdx$/, '')
        const toc = global.docFetchToc(urlPath)
        for (const member in node) {
            delete node[member]
        }
        node.type = "element"
        node.tagName = "ul"
        let tocNodes = childrenItems(toc.children)
        node.children = tocNodes
        console.log(node)
    })
  }
}

export default tableOfContents
