import { useContext } from 'react';
import { storeContext } from '../store/context';
import { useRouter } from 'next/router';
import { Link, withTranslation } from '../i18n';
import { Alert, Collapse, Navbar, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { useLocalStore, useObserver } from 'mobx-react';
import LanguageSelector from './language-selector';
import ThemeSelector from './theme-selector';

const Header = ({ t } : { t: any }): JSX.Element => {
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
        dark
        color="dark"
        expand="lg"
        fixed="top"
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
                  {t('navigation:home')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/models/[category]" as="/models/all" passHref>
                <NavLink active={isRouteActive('/models/all')}>
                  {t('navigation:models')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/how-to-use-models" passHref>
                <NavLink active={isRouteActive('/how-to-use-models')}>
                  {t('navigation:howto')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/terms-of-use" passHref>
                <NavLink active={isRouteActive('/terms-of-use')}>
                  {t('navigation:tos')}
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/application" passHref>
                <NavLink active={isRouteActive('/application')}>
                  {t('navigation:application')}
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
          {t('errors.placeholder')} {t(store.error.message)}
        </Alert>
      }
    </>
  ));
};

export async function getInitialProps(): Promise < any > {
  return {
    namespacesRequired: ['common', 'navigation'],
  };
}

export default withTranslation(['common', 'navigation'])(Header);
