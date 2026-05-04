import { codeToHtml } from 'shiki'
import { visit } from 'unist-util-visit'

/**
 * @typedef {Object} Options
 * @property {string} [theme]        default: 'dracula'
 * @property {string} [defaultLang]  default: 'plaintext'
 */

/**
 * Gatsby remark sub-plugin: rewrites Markdown `code` nodes into raw
 * HTML produced by Shiki's `codeToHtml`. Runs at build time.
 *
 * @param {{ markdownAST: import('mdast').Root }} arg
 * @param {Options} [options]
 */
export default async function gatsbyRemarkShiki({ markdownAST }, options = {}) {
  const theme = options.theme ?? 'dracula'
  const defaultLang = options.defaultLang ?? 'plaintext'
  const tasks = []
  visit(markdownAST, 'code', (node) => {
    const lang = node.lang || defaultLang
    tasks.push(
      codeToHtml(node.value, { lang, theme }).then((html) => {
        node.type = 'html'
        node.value = html
      })
    )
  })
  await Promise.all(tasks)
  return markdownAST
}
