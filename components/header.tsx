import { useContext } from 'react';
import { storeContext } from '../store/context';
import { useRouter } from 'next/router';
import { Link, withTranslation } from '../i18n';
import { Alert, Collapse, Navbar, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { useLocalStore, useObserver } from 'mobx-react';
import LanguageSelector from './language-selector';
import ThemeSelector from './theme-selector';

const Header = (props: any): JSX.Element => {
  const store = useContext(storeContext);
  const router = useRouter();

  function isRouteActive(href: string): boolean {
    return router.route === href;
  }

  const state = useLocalStore(() => ({
    toggled: false,
    toggle() {
      state.toggled = !state.toggled;
    }
  }));

  return useObserver(() => (
    <>
      <Navbar
        expand="lg"
        fixed={!props.isStatic ? 'top' : undefined}
        className={props.isStatic ? 'navbar-static' : ''}
      >
        <Link href="/" passHref>
          <a
            className="navbar-brand"
            href="/"
          >
            <img src={'/static/icons/logo-icon.svg'} alt="Meshhouse" />
            <p>
              <b>Mesh</b>house
            </p>
          </a>
        </Link>
        <NavbarToggler onClick={state.toggle} />
        <Collapse className="justify-content-center" isOpen={state.toggled} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/" passHref>
                <NavLink active={isRouteActive('/')}>
                  {props.t('navigation:home')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/models/[category]" as="/models/all" passHref>
                <NavLink active={isRouteActive('/models/all')}>
                  {props.t('navigation:models')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/application" passHref>
                <NavLink active={isRouteActive('/application')}>
                  {props.t('navigation:application')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <LanguageSelector />
            </NavItem>
            <NavItem>
              <ThemeSelector />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {store?.error.visible === true &&
        <Alert className="navbar-error" color="danger">
          {props.t('errors.placeholder')} {props.t(store.error.message)}
        </Alert>
      }
    </>
  ));
};

export async function getInitialProps(): Promise <any> {
  return {
    namespacesRequired: ['common', 'navigation'],
  };
}

export default withTranslation(['common', 'navigation'])(Header);
