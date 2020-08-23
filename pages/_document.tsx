import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import nookies from 'nookies';
import { i18nPropsFromCtx } from '../i18n';

class MyDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    let theme = 'light';
    const cookies = nookies.get(ctx);
    const i18nDocumentProps = i18nPropsFromCtx(ctx);

    if (Object.hasOwnProperty.call(cookies, 'theme')) {
      theme = cookies.theme;
    }

    nookies.set(ctx, 'theme', theme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      i18nDocumentProps,
      theme
    };
  }

  render(): JSX.Element {
    const { theme, i18nDocumentProps } = this.props;
    return (
      <Html {...i18nDocumentProps}>
        <Head />
        <body className={`theme-${theme}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
