import { visit } from 'unist-util-visit'
import fixWindowsPath from '../shared/lib/outline/fixWindowsPath'
import { outlineCachesFetcher } from '../shared/lib/outline/outlineCachesFetcher'

const prevNext: any = () => {
  return (tree: any, vfile: any) => {
    visit(tree, (node: any) => node.type == "mdxJsxFlowElement" && node.name === "PrevNext", (node) => {
        const urlPath = fixWindowsPath(vfile.path.replace(vfile.cwd, '')).replace(/^\/src\/app/, '').replace(/\/page.mdx$/, '')
        const prevNextData = outlineCachesFetcher.prevNext(urlPath)
        if (!prevNextData) {
            return
        }
        for (const member in node) {
            delete node[member]
        }
        node.type = "element"
        node.tagName = "div"
        node.properties = {
            class: 'prevNext'
        }
        node.children = [
            !prevNextData.prev ? {
                type: 'element',
                tagName: 'div',
                properties: {
                    class: 'flex-grow-extend'
                }
            } : {
                type: 'element',
                tagName: 'a',
                properties: {
                    class: 'prev',
                    href: prevNextData.prev.urlPath
                },
                children: [
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            class: 'label'
                        },
                        children: [
                            {
                                type: 'text',
                                value: 'PREV'
                            }
                        ]
                    },
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            class: 'title'
                        },
                        children: [
                            {
                                type: 'text',
                                value: prevNextData.prev.title
                            }
                        ]
                    }
                ]
            },
            !prevNextData.next ? {
                type: 'element',
                tagName: 'div',
            } : {
                type: 'element',
                tagName: 'a',
                properties: {
                    class: 'next',
                    href: prevNextData.next.urlPath
                },
                children: [
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            class: 'label'
                        },
                        children: [
                            {
                                type: 'text',
                                value: 'NEXT'
                            }
                        ]
                    },
                    {
                        type: 'element',
                        tagName: 'div',
                        properties: {
                            class: 'title'
                        },
                        children: [
                            {
                                type: 'text',
                                value: prevNextData.next.title
                            }
                        ]
                    }
                ]
            }
        ]
    })
  }
}

export default prevNext
