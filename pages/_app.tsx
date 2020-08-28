import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import '../sass/main.sass';

import StoreProvider from '../store/context';
import { appWithTranslation } from '../i18n';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { faCalendarAlt, faLanguage, faExpand, faRedo, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faApple, faLinux, faWindows } from '@fortawesome/free-brands-svg-icons';

library.add(faCalendarAlt, faLanguage, faApple, faLinux, faWindows, faExpand, faRedo, faImages, faSun, faMoon);

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Noop = ({ children }: { children: any }) => children;

class MyApp extends App<any, any> {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || Noop;

    return (
      <>
        <Head>
          <meta name='application-name' content='Meshhouse' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Meshhouse' />
          <meta name="description" content="Free 3d models for commerial use" />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name="theme-color" content="#2b5797" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>Meshhouse</title>

          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#2b5797" />
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://meshhouse.art' />
          <meta name='twitter:title' content='Meshhouse' />
          <meta name='twitter:description' content='Free 3d models for commerial use' />
          <meta name='twitter:image' content='https://meshhouse.art/static/icons/android-chrome-192x192.png' />
          <meta name='twitter:creator' content='@longsightedfilms' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Meshhouse' />
          <meta property='og:description' content='Free 3d models for commerial use' />
          <meta property='og:site_name' content='Meshhouse' />
          <meta property='og:url' content='https://meshhouse.art' />
          <meta property='og:image' content='https://meshhouse.art/static/favicons/apple-touch-icon.png' />
        </Head>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </>
    );
  }
}

export default appWithTranslation(MyApp);
