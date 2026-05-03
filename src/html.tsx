import React from 'react'

interface Props {
  htmlAttributes: Record<string, unknown>
  headComponents: React.ReactNode[]
  bodyAttributes: Record<string, unknown>
  preBodyComponents: React.ReactNode[]
  body: string
  postBodyComponents: React.ReactNode[]
}

const HTML: React.FC<Props> = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => (
  <html {...htmlAttributes} lang={(htmlAttributes.lang as string) ?? 'en'}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
)

export default HTML
