import { languages, withTranslation } from '../i18n';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LanguageToggle = ({ t, i18n }: { t: any, i18n: any }): JSX.Element => {
  const currentLanguage = i18n.language;

  return (
    <UncontrolledDropdown>
      <DropdownToggle tag="a" className="nav-link nav-link--dropdown" caret>
        { t('language') }
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{ t('language') }</DropdownItem>
        {languages.map((item: Language, idx: number) => (
          <DropdownItem
            key={ idx }
            onClick={ () => i18n.changeLanguage(item.code) }
            active={ currentLanguage === item.code }
          >
            { item.text }
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export async function getInitialProps(): Promise <any> {
  return {
    namespacesRequired: ['common'],
  };
}

export default withTranslation('common')(LanguageToggle);
