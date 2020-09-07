import { PureComponent } from 'react';
import { Link, withTranslation } from '../i18n';

class Footer extends PureComponent<any, any> {
  static async getInitialProps(): Promise<any> {
    return {
      namespacesRequired: ['common', 'navigation'],
    };
  }

  render(): JSX.Element {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Link href="/" passHref>
                <a
                  className="footer-brand"
                  href="/"
                >
                  <img src={'/static/icons/logo-icon.svg'} alt="Meshhouse" />
                  <p>
                    <b>Mesh</b>house
                  </p>
                </a>
              </Link>
              <p>
                &copy; {new Date().getFullYear()} MeshHouse team
              </p>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-3">
              <ul className="list-unstyled">
                <li>
                  <Link href="/models/[category]" as="/models/all" passHref>
                    <a href="/models/all">
                      {this.props.t('navigation:models')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/how-to-use-models" passHref>
                    <a href="/how-to-use-models">
                      {this.props.t('navigation:howto')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/application" passHref>
                    <a href="/application">
                      {this.props.t('navigation:application')}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <ul className="list-unstyled">
                <li>
                  <Link href="/terms-of-service" passHref>
                    <a href="/terms-of-service">
                      {this.props.t('navigation:tos')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dmca-policy" passHref>
                    <a href="/dmca-policy">
                      {this.props.t('navigation:dmca')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" passHref>
                    <a href="/privacy-policy">
                      {this.props.t('navigation:privacyPolicy')}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" passHref>
                    <a href="/contact-us">
                      {this.props.t('navigation:contactUs')}
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/meshhouse" target="_blank" rel="noreferrer">
                    Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default withTranslation(['common', 'navigation'])(Footer);
