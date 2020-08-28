import Head from 'next/head';
import withLayout from '../layouts/main';
import { withTranslation } from '../i18n';

const Home = ({ t }: { t: any }): JSX.Element => (
  <div>
    <Head>
      <title>Meshhouse</title>
    </Head>
    <div className="index-jumbotron">
      <img
        className="index-jumbotron__background"
        src="/static/images/landscape-4480996_1920.jpg"
        alt=""
      />
      <div className="index-jumbotron__content">
        <h1 className="title">
          { t('title') }
        </h1>
        <p className="description">
          { t('description') }
        </p>
        <p
          className="courtesy"
          dangerouslySetInnerHTML={{ __html: t('link') }}
        />
      </div>
    </div>
  </div>
);

Home.Layout = withLayout;

export async function getInitialProps(): Promise<any> {
  return {
    namespacesRequired: ['pages-index'],
  };
}

export default withTranslation('pages-index')(Home);
