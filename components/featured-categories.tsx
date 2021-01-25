import { Link, withTranslation } from '../i18n';

const FeaturedCategories = ({ t } : { t: any }): JSX.Element => {
  return (
    <div className="featured-categories">
      <Link href="/models/all?tag=test" passHref>
        <a className="featured-category" href="/models/all?tag=test">
          <picture className="featured-category__background">
            <source srcSet="/static/images/index_heading.avif" type="image/avif" />
            <source srcSet="/static/images/index_heading.webp" type="image/webp" />
            <source srcSet="/static/images/index_heading.jpg" type="image/jpeg" />
            <img
              className="featured-category__background"
              src="/static/images/index_heading.jpg"
              alt=""
            />
          </picture>
          <div className="featured-category__content">
            <h4 className="title">
              <span>Test featured category</span></h4>
          </div>
        </a>
      </Link>
      <div className="featured-categories--aside">
        <Link href="/models/all" passHref>
          <a className="featured-category" href="/models/all">
            <picture className="featured-category__background">
              <source srcSet="/static/images/index_heading.avif" type="image/avif" />
              <source srcSet="/static/images/index_heading.webp" type="image/webp" />
              <source srcSet="/static/images/index_heading.jpg" type="image/jpeg" />
              <img
                className="featured-category__background"
                src="/static/images/index_heading.jpg"
                alt=""
              />
            </picture>
            <div className="featured-category__content">
              <h4 className="title">
                <span>Test featured category</span>
              </h4>
            </div>
          </a>
        </Link>
        <div className="featured-categories--sub">
          <Link href="/models/all" passHref>
            <a className="featured-category" href="/models/all">
              <picture className="featured-category__background">
                <source srcSet="/static/images/index_heading.avif" type="image/avif" />
                <source srcSet="/static/images/index_heading.webp" type="image/webp" />
                <source srcSet="/static/images/index_heading.jpg" type="image/jpeg" />
                <img
                  className="featured-category__background"
                  src="/static/images/index_heading.jpg"
                  alt=""
                />
              </picture>
              <div className="featured-category__content">
                <h4 className="title">
                  <span>Test featured category</span>
                </h4>
              </div>
            </a>
          </Link>
          <Link href="/models/all" passHref>
            <a className="featured-category" href="/models/all">
              <picture className="featured-category__background">
                <source srcSet="/static/images/index_heading.avif" type="image/avif" />
                <source srcSet="/static/images/index_heading.webp" type="image/webp" />
                <source srcSet="/static/images/index_heading.jpg" type="image/jpeg" />
                <img
                  className="featured-category__background"
                  src="/static/images/index_heading.jpg"
                  alt=""
                />
              </picture>
              <div className="featured-category__content">
                <h4 className="title">
                  <span>Test featured category</span>
                </h4>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export async function getInitialProps(): Promise <any> {
  return {
    namespacesRequired: ['common'],
  };
}

export default withTranslation('common')(FeaturedCategories);
