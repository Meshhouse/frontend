import { PureComponent } from 'react';
import { withTranslation } from '../i18n';
import { Container, Row, Col } from 'reactstrap';

class Footer extends PureComponent<any, any> {
  static async getInitialProps(): Promise<any> {
    return {
      namespacesRequired: ['common', 'navigation'],
    };
  }

  render(): JSX.Element {
    return (
      <>
        <Container
          fluid
          className="footer"
        >
          <Row>
            <Col xs="12">
              <p className="m-0">
                &copy; {new Date().getFullYear()} Long-Sighted Films LLC
              </p>
              <a href="mailto:support@meshhouse.art">
                {this.props.t('contactLink')}
              </a>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withTranslation(['common', 'navigation'])(Footer);
