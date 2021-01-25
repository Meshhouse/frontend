import { useContext } from 'react';
import { storeContext } from '../store/context';
import { useRouter } from 'next/router';
import { Link, withTranslation } from '../i18n';
import { Alert, NavLink} from 'reactstrap';
import { useLocalStore, useObserver } from 'mobx-react';
import LanguageSelector from './language-selector';
import ThemeSelector from './theme-selector';
import SearchBox from './search-box';

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
      <header className="header">
        <nav className="header__container">
          <div className="nav-item">
            <Link href="/how-to-use-models" passHref>
              <a className="nav-link" href="/how-to-use-models">
                {props.t('navigation:howto')}
              </a>
            </Link>
          </div>
          <div className="navbar__links">
            <div className="nav-item">
              <LanguageSelector />
            </div>
            <div className="nav-item">
              <ThemeSelector />
            </div>
          </div>
        </nav>
      </header>
      <header className="header__navbar">
        <nav className="navbar__container">
          <Link href="/" passHref>
            <a
              className="navbar__brand"
              href="/"
            >
              <img
                className="brand__image"
                src={'/static/icons/logo-icon.svg'} alt="Meshhouse"
              />
              <p className="brand__title">
                <b>Mesh</b>house
              </p>
            </a>
          </Link>
          <SearchBox />
          <div className="navbar__links">
            <div className="nav-item">
              <Link href="/" passHref>
                <NavLink active={isRouteActive('/')}>
                  {props.t('navigation:home')}
                </NavLink>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/models/all" passHref>
                <NavLink active={isRouteActive('/models/all')}>
                  {props.t('navigation:models')}
                </NavLink>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/application" passHref>
                <NavLink active={isRouteActive('/application')}>
                  {props.t('navigation:application')}
                </NavLink>
              </Link>
            </div>
          </div>
        </nav>
      </header>
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
