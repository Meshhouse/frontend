import { PureComponent } from 'react';
import { Link, withTranslation } from '../i18n';
import { Alert, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { observer, inject } from 'mobx-react';
//import LanguageSelector from './language-selector';
//import ThemeSelector from './theme-selector';

@inject('Store')
@observer
class Header extends PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle(): void {
    this.setState({isOpen: !this.state.isOpen });
  }

  static async getInitialProps(): Promise<any> {
    return {
      namespacesRequired: ['common', 'navigation'],
    };
  }

  render() {
    return (
      <>
        <Navbar
          dark
          color="dark"
          expand="lg"
          fixed="top"
        >
          <NavbarBrand>
            <img src={'/static/icons/logo-icon.svg'} alt="Meshhouse" />
            <p>
              <b>Mesh</b>house
            </p>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="justify-content-center" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/" passHref>
                  <NavLink>
                    {this.props.t('navigation:home')}
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/models/all" passHref>
                  <NavLink>
                    {this.props.t('navigation:models')}
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/how-to-use-models" passHref>
                  <NavLink>
                    {this.props.t('navigation:howto')}
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/terms-of-use" passHref>
                  <NavLink>
                    {this.props.t('navigation:tos')}
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/application" passHref>
                  <NavLink>
                    {this.props.t('navigation:application')}
                  </NavLink>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {this.props.Store.error.visible === true &&
          <Alert className="navbar-error" color="danger">
            {this.props.t('errors.placeholder')} {this.props.t(this.props.Store.error.message)}
          </Alert>
        }
      </>
    );
  }
}

export default withTranslation(['common', 'navigation'])(Header);
