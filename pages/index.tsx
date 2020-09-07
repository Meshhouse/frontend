import Head from 'next/head';
import withLayout from '../layouts/main-static';
import { withTranslation } from '../i18n';

const Home = ({ t }: { t: any }): JSX.Element => (
  <>
    <Head>
      <title>Meshhouse</title>
    </Head>
    <div className="index-jumbotron">
      <picture className="index-jumbotron__background">
        <source srcSet="/static/images/index_heading.avif" type="image/avif" />
        <source srcSet="/static/images/index_heading.webp" type="image/webp" />
        <source srcSet="/static/images/index_heading.jpg" type="image/jpeg" />
        <img
          className="index-jumbotron__background"
          src="/static/images/index_heading.jpg"
          alt=""
        />
      </picture>
      <div className="index-jumbotron__content">
        <h1 className="title">
          { t('title') }
        </h1>
        <p className="description">
          { t('description') }
        </p>
        <p
          className="courtesy"
        >
          Ancient Greek bedroom by Maxim Makarov
        </p>
      </div>
    </div>
    <div className="container index-features">
      <div className="row">
        <div className="col-xxl-5 col-lg-6 index-features__block">
          <img
            src="/static/images/index/timemanagement.svg"
            alt="Time management"
          />
          <a href='https://www.freepik.com/vectors/work'>Work vector created by stories - www.freepik.com</a>
        </div>
        <div className="col-xxl-7 col-lg-6 index-features__block">
          <h2>{t('features.readytouse.title')}</h2>
          <p>{t('features.readytouse.text')}</p>
          <i>{t('features.readytouse.note')}</i>
        </div>
        <div className="col-xxl-7 col-lg-6 index-features__block">
          <h2>{t('features.free.title')}</h2>
          <p>{t('features.free.text')}</p>
        </div>
        <div className="col-xxl-5 col-lg-6 index-features__block">
          <img
            src="/static/images/index/moneysavings.svg"
            alt="Money savings"
          />
          <a href='https://www.freepik.com/vectors/money'>Money vector created by stories - www.freepik.com</a>
        </div>
        <div className="col-xxl-5 col-lg-6 index-features__block">
          <img
            src="/static/images/index/opensource.svg"
            alt="Pair programming"
          />
          <a href='https://www.freepik.com/vectors/technology'>Technology vector created by stories - www.freepik.com</a>
        </div>
        <div className="col-xxl-7 col-lg-6 index-features__block">
          <h2>{t('features.opensource.title')}</h2>
          <p>{t('features.opensource.text')}</p>
        </div>
      </div>
    </div>
    <div className="container index-programs">
      <div className="row">
        <div className="col-12">
          <h2>{t('programs.title')}</h2>
          <i>{t('programs.note')}</i>
        </div>
        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
          <div className="index-programs__block">
            <img
              src="/static/icons/programs/3dsmax.svg"
              alt="3ds Max logo"
            />
            <p>{t('programs.max')}</p>
            <ul>
              <li>Redshift 2.6+</li>
            </ul>
          </div>
        </div>
        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
          <div className="index-programs__block">
            <img
              src="/static/icons/programs/maya.svg"
              alt="Maya logo"
            />
            <p>{t('programs.maya')}</p>
            <ul>
              <li>Redshift 2.6+</li>
            </ul>
          </div>
        </div>
        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
          <div className="index-programs__block">
            <img
              src="/static/icons/programs/blender.svg"
              alt="Blender logo"
            />
            <p>{t('programs.blender')}</p>
            <ul>
              <li>Cycles</li>
            </ul>
          </div>
        </div>
        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
          <div className="index-programs__block">
            <img
              className="padded"
              src="/static/icons/programs/cinema4d.svg"
              alt="Cinema4D logo"
            />
            <p>{t('programs.cinema4d')}</p>
            <ul>
              <li>Redshift 2.6+</li>
            </ul>
          </div>
        </div>
        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
          <div className="index-programs__block">
            <img
              className="padded"
              src="/static/icons/programs/unity.svg"
              alt="Unity logo"
            />
            <p>{t('programs.unity')}</p>
          </div>
        </div>
        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
          <div className="index-programs__block">
            <img
              src="/static/icons/programs/unrealengine.svg"
              alt="Unreal Engine logo"
            />
            <p>{t('programs.unreal')}</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

Home.Layout = withLayout;

export async function getInitialProps(): Promise<any> {
  return {
    namespacesRequired: ['pages-index'],
  };
}

export default withTranslation('pages-index')(Home);
