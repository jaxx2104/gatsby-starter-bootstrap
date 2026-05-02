import path from 'path'
import type { GatsbyNode } from 'gatsby'

const PostTemplate = path.resolve('./src/templates/template.tsx')

interface PageQueryResult {
  allFile: {
    edges: Array<{
      node: {
        id: string
        sourceInstanceName: string
        absolutePath: string
        childMarkdownRemark: {
          id: string
          frontmatter: { layout?: string; path: string }
        } | null
      }
    }>
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions
  const result = await graphql<PageQueryResult>(`
    {
      allFile(filter: { extension: { regex: "/md|tsx/" } }, limit: 1000) {
        edges {
          node {
            id
            sourceInstanceName
            absolutePath
            childMarkdownRemark {
              id
              frontmatter {
                layout
                path
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild('Failed to query content for createPages', result.errors)
    return
  }

  const items = result.data.allFile.edges
  const posts = items.filter(({ node }) => /posts/.test(node.sourceInstanceName))
  posts.forEach(({ node }) => {
    if (!node.childMarkdownRemark) return
    const { path: postPath } = node.childMarkdownRemark.frontmatter
    createPage({ path: postPath, component: PostTemplate })
  })

  const pages = items.filter(({ node }) => /page/.test(node.sourceInstanceName))
  pages.forEach(({ node }) => {
    if (!node.childMarkdownRemark) return
    const { name } = path.parse(node.absolutePath)
    const PageTemplate = path.resolve(node.absolutePath)
    createPage({ path: name, component: PageTemplate })
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
