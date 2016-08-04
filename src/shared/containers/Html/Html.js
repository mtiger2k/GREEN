import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { RouterContext } from 'react-router';
import { ApolloProvider } from 'react-apollo';
import { StyleSheetServer } from 'aphrodite';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    store: PropTypes.object,
    client: PropTypes.object,
    renderProps: PropTypes.object
  };

  render() {
    const { assets, store, client, renderProps } = this.props;
    const head = Helmet.rewind();

    const component = (
      <ApolloProvider client={client} store={store}>
        <RouterContext {...renderProps}/>
      </ApolloProvider>
    );

    const { html, css } = StyleSheetServer.renderStatic(() => {
      return renderToString(component);
    });

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta charSet="UTF-8" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />

          <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
          <meta name="apple-mobile-web-app-title" content="Rubix" />
          <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/favicons/favicon-160x160.png" sizes="160x160" />
          <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
          <meta name="msapplication-TileColor" content="#E76049" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />

          <style dangerouslySetInnerHTML={{__html: require('../../../../static/sass/main.scss')._style}} />
          <style data-aphrodite dangerouslySetInnerHTML={{__html: css.content}}/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/themes/silver/pace-theme-center-atom.min.css" />
          <script type="text/javascript" src="//code.jquery.com/jquery-1.10.0.min.js" />
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.12/js/perfect-scrollbar.min.js" />
          <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: html}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script dangerouslySetInnerHTML={{__html: `window.renderedClassNames=${JSON.stringify(css.renderedClassNames)};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
