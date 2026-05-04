import type { GatsbyConfig } from 'gatsby'

const siteMetadata = {
  title: 'Gatstrap',
  description: 'A Bootstrap 5 starter for Gatsby',
  siteUrl: 'https://gatstrap.netlify.app',
  author: 'jaxx2104',
  twitter: 'jaxx2104',
} as const

const config: GatsbyConfig = {
  siteMetadata,
  graphqlTypegen: {
    typesOutputPath: 'src/gatsby-types.d.ts',
    generateOnBuild: true,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: { path: `${__dirname}/content/posts/`, name: 'posts' },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { path: `${__dirname}/content/images/`, name: 'images' },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        description: siteMetadata.description,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#673ab7',
        display: 'standalone',
        icon: 'static/img/android-chrome-512x512.png',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-image',
    'gatsby-plugin-netlify',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
  ],
}

export default config
export { siteMetadata }
