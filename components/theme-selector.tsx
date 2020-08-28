import { useContext } from 'react';
import nookies from 'nookies';
import { CustomInput } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useObserver } from 'mobx-react';
import { storeContext } from '../store/context';

const ThemeSelector = (): JSX.Element => {
  const store = useContext(storeContext);

  const cookies = nookies.get({});

  if (Object.hasOwnProperty.call(cookies, 'theme')) {
    store?.setTheme(cookies.theme as any);
  }

  function handleSwitcher(): void {
    const theme = store?.theme;
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    store?.setTheme(newTheme);
    nookies.set({}, 'theme', newTheme, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      sameSite: 'Lax'
    });
    (document.querySelector('body') as Element).className = '';
    (document.querySelector('body') as Element).classList.add(`theme-${newTheme}`);
  }

  return useObserver(() => (
    <>
      <div className='theme-selector'>
        <FontAwesomeIcon icon='sun' />
        <CustomInput
          id='theme-selector'
          type='switch'
          onChange={handleSwitcher}
          checked={store?.theme === 'dark'}
        />
        <FontAwesomeIcon icon='moon' />
      </div>
    </>
  ));
};

export default ThemeSelector;
