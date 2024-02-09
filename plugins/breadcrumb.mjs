/** @type {import('unified').Plugin<[], import('hast').Root>} */
const breadcrumb = () => {
  return (tree, vfile) => {
    let index = tree.children.findIndex((child) => child.type !== 'mdxjsEsm')
    if (index !== undefined) {
        const urlPath = vfile.path.replace(vfile.cwd, '').replace(/^\/src\/app/, '').replace(/\/page.mdx$/, '')
        const breadcrumbData = global.docFetchBreadcrumb(urlPath)
        console.log("See dta: ", breadcrumbData)
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
            tree.children.splice(index, 0, breadcrumbsNode)
        }
    }
  }
}

export default breadcrumb
