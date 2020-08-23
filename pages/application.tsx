import { PureComponent } from 'react';
import Head from 'next/head';
import { withTranslation } from '../i18n';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import withLayout from '../layouts/main';

class Application extends PureComponent<any, any> {
  static Layout: ({ children }: { children: any; }) => JSX.Element;

  static async getInitialProps(): Promise<any> {
    return {
      namespacesRequired: ['application'],
    };
  }

  render(): JSX.Element {
    return (
      <>
        <Head>
          <title>{this.props.t('title')} - Meshhouse</title>
        </Head>
        <Jumbotron className="text-center" fluid>
          <h1>{this.props.t('title')}</h1>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <p className="lead" dangerouslySetInnerHTML={{ __html: this.props.t('lead') }} />
              <img src='/static/images/meshhouse_1.png' alt="Meshhouse application" className="img-fluid my-4" />
              <h3>{this.props.t('featureTitle')}</h3>
              <hr />
              <ul dangerouslySetInnerHTML={{ __html: this.props.t('featureList') }} />
              <p>{this.props.t('note')}</p>
              <h3>{this.props.t('platforms')}</h3>
              <hr />
              <ul className="list-unstyled">
                <li className="d-flex align-items-center">
                  <FontAwesomeIcon icon={['fab', 'windows']} size="3x" />
                  <p className="mb-0 ml-2 h5">{this.props.t('platformWin')}</p>
                </li>
                <li className="d-flex align-items-center">
                  <FontAwesomeIcon icon={['fab', 'apple']} size="3x" />
                  <p className="mb-0 ml-2 h5">{this.props.t('platformMac')}</p>
                </li>
                <li className="d-flex align-items-center">
                  <FontAwesomeIcon icon={['fab', 'linux']} size="3x" />
                  <p className="mb-0 ml-2 h5">{this.props.t('platformLinux')}</p>
                </li>
              </ul>
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
