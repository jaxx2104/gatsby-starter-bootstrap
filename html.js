import React from "react"
import DocumentTitle from "react-document-title"
import { prefixLink } from "gatsby-helpers"

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
  displayName: "HTML",
  propTypes: {
    body: React.PropTypes.string,
  },
  render() {
    const {body, route} = this.props
    const title = DocumentTitle.rewind()
    const jquery = <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" ></script>
    const tether = <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" ></script>
    const bootstrap = <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" ></script>

    let css
    if (process.env.NODE_ENV === "production") {
      css = <style dangerouslySetInnerHTML={ {    __html: require("!raw!./public/styles.css")} } />
    }

    return (
            <html lang="en">
              <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=5.0" />
                <title>
                  { title }
                </title>
                { css }
                { jquery }
                { tether }
                { bootstrap }
              </head>
              <body>
                <div id="react-mount" dangerouslySetInnerHTML={ {    __html: this.props.body} } />
                <script src={ prefixLink(`/bundle.js?t=${BUILD_TIME}`) } />
              </body>
            </html>
    )
  },
})
