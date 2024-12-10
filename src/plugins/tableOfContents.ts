import { visit } from 'unist-util-visit'
import fixWindowsPath from '../lib/outline/fixWindowsPath'
import { outlineCachesFetcher } from '../lib/outline/outlineCachesFetcher'

const childrenItems = (children: any) => {
    return children.map((child: any) => {
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
            } as any)
        }
        return result
    })
}

/** @type {import('unified').Plugin<[], import('hast').Root>} */
const tableOfContents = () => {
  return (tree: any, vfile: any) => {
    visit(tree, (node: any) => node.type == "mdxJsxFlowElement" && node.name === "TableOfContents", (node) => {
        const urlPath = fixWindowsPath(vfile.path.replace(vfile.cwd, '')).replace(/^\/src\/app/, '').replace(/\/page.mdx$/, '')
        const toc = outlineCachesFetcher.tableOfContents(urlPath)
        for (const member in node) {
            delete node[member]
        }
        node.type = "element"
        node.tagName = "ul"
        if (toc && toc.children) {
            node.children = childrenItems(toc.children)
        }
    })
  }
}

export default tableOfContents
