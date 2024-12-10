import { Plugin } from 'unified'
import { Root } from 'hast'
import fixWindowsPath from '../shared/lib/outline/fixWindowsPath'
import { outlineCachesFetcher } from '../shared/lib/outline/outlineCachesFetcher'

const breadcrumb: Plugin<[], Root> = () => {
  return (tree, vfile) => {
    let index = tree.children.findIndex((child) => child.type !== 'mdxjsEsm')
    if (index !== undefined) {
        const urlPath = fixWindowsPath(vfile.path.replace(vfile.cwd, '')).replace(/^\/src\/app/, '').replace(/\/page.mdx$/, '')
        const breadcrumbData = outlineCachesFetcher.breadcrumbs(urlPath)
        if (breadcrumbData) {
            let breadcrumbsNode = {
                type: "element",
                tagName: "div",
                properties: {
                    class: "breadcrumbs"
                },
                children: []
            }
            breadcrumbData.forEach((data, index) => {
                breadcrumbsNode.children.push({
                    type: "element",
                    tagName: "span",
                    properties: {
                        class: "breadcrumb"
                    },
                    children: [
                        {
                            type: "element",
                            tagName: "a",
                            properties: {
                                href: data.urlPath
                            },
                            children: [
                                {
                                    type: "text",
                                    value: data.title
                                }
                            ]
                        }
                    ]
                })
                if (index !== breadcrumbData.length - 1) {
                    breadcrumbsNode.children.push({
                        type: "element",
                        tagName: "span",
                        children: [
                            {
                                type: "text",
                                value: " / "
                            }
                        ]
                    })
                }
            })
            tree.children.splice(index, 0, breadcrumbsNode as any)
        }
    }
  }
}

export default breadcrumb
