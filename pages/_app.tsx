import App from 'next/app';
import Head from 'next/head';
import '../sass/main.sass';

import { Provider } from 'mobx-react';
import Store from '../store';
import { appWithTranslation } from '../i18n';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { faCalendarAlt, faLanguage, faExpand, faRedo, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';

library.add(faCalendarAlt, faLanguage, faApple, faLinux, faWindows, faExpand, faRedo, faImages, faSun, faMoon);


const Noop = ({ children }: { children: any }) => children;

class MyApp extends App<any, any> {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || Noop;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Free 3d models for commerial use" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#2b5797" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Meshhouse" />
          <meta name="application-name" content="Meshhouse" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#2b5797"></meta>
          <title>Meshhouse</title>
        </Head>
        <Provider Store={Store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </>
    );
  }
}

export default appWithTranslation(MyApp);
