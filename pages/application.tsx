import { PureComponent } from 'react';
import Head from 'next/head';
import { withTranslation } from '../i18n';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withLayout from '../layouts/main-static';
import axios from 'axios';

class Application extends PureComponent<any, any> {
  static Layout: ({ children }: { children: any; }) => JSX.Element;

  static async getInitialProps(): Promise<any> {
    const key = process.env.GITHUB_TOKEN || '';
    const response = (await axios.get('https://api.github.com/repos/longsightedfilms/meshhouse/releases', {
      auth: {
        username: 'longsightedfilms',
        password: key
      }
    })).data;

    const lastRelease = response.filter((item: any) => item.draft === false)[0];
    const releaseVersion = lastRelease.tag_name.substr(1, lastRelease.tag_name.length);
    const assets = lastRelease.assets.filter((asset: any) => {
      return asset.size > 7000000;
    });

    const assetLinux = assets.filter((asset: any) => asset.name.indexOf('.AppImage') !== -1)[0];
    const assetWindows = assets.filter((asset: any) => asset.name.indexOf('.exe') !== -1)[0];
    const assetMac = assets.filter((asset: any) => asset.name.indexOf('.dmg') !== -1)[0];

    const release = {
      version: releaseVersion,
      assets: {
        windows: assetWindows.browser_download_url,
        mac: assetMac.browser_download_url,
        linux: assetLinux.browser_download_url
      }
    };

    return {
      release,
      namespacesRequired: ['application'],
    };
  }

  render(): JSX.Element {
    return (
      <>
        <Head>
          <title>{this.props.t('title')} - Meshhouse</title>
        </Head>
        <header className="application__jumbotron">
          <Container>
            <Row>
              <Col
                xl={6}
                col={12}
              >
                <div className="left">
                  <h1>Handle your models with ease</h1>
                  <p>with our cross-platform open-sourced application</p>
                  <div className="application__jumbotron-links">
                    <a
                      className="btn btn-primary"
                      href={this.props.release.assets.windows}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={['fab', 'windows']} size="1x" />
                      {this.props.t('download.windows', { version: this.props.release.version })}
                    </a>
                    <a
                      className="btn btn-primary"
                      href={this.props.release.assets.mac}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={['fab', 'apple']} size="1x" />
                      {this.props.t('download.mac', { version: this.props.release.version })}
                    </a>
                    <a
                      className="btn btn-primary"
                      href={this.props.release.assets.linux}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={['fab', 'linux']} size="1x" />
                      {this.props.t('download.linux', { version: this.props.release.version })}
                    </a>
                  </div>
                  <a
                    className="href"
                    href='https://www.freepik.com/vectors/design'
                  >
                    Design vector created by stories - www.freepik.com
                  </a>
                </div>
              </Col>
              <Col
                xl={6}
                col={12}
              >
                <img
                  className="application__jumbotron-image"
                  src="/static/images/application/jumbotron-image.svg"
                  alt="MeshHouse"
                />
              </Col>
            </Row>
          </Container>
        </header>
        <Container>
          <Row>
            <Col>
              <p className="lead" dangerouslySetInnerHTML={{ __html: this.props.t('lead') }} />
              <img src='/static/images/meshhouse_1.png' alt="Meshhouse application" className="img-fluid my-4" />
              <h3>{this.props.t('featureTitle')}</h3>
              <hr />
              <ul dangerouslySetInnerHTML={{ __html: this.props.t('featureList') }} />
              <p>{this.props.t('note')}</p>
              <hr />
              <h3>{this.props.t('localize')}</h3>
              <hr />
              <p>English, Русский</p>
              <p>{this.props.t('status')}</p>
              <a href="https://github.com/longsightedfilms/meshhouse">
                {this.props.t('link')}
              </a>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Application.Layout = withLayout;

export default withTranslation('application')(Application);
