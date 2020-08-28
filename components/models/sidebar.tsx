import React from 'react';
import { Link, withTranslation } from '../../i18n';
import { getNestedCategories } from '../../helpers/api';
import { useRouter } from 'next/router';

import Badge from '../ui/badge';
import Icon from '../ui/icon';

const ModelsSidebar = (props: any): JSX.Element => {
  const router = useRouter();

  function isRouteActive(href: string): boolean {
    return router.asPath === href;
  }

  function linkClass(href: string, type: 'main' | 'nested'): string {
    const link = type === 'main' ? 'models-sidebar__link' : 'models-sidebar__sublink';
    return `${link} ${isRouteActive(href) ? `${link}--active` : ''}`;
  }

  const currentLanguage = props.i18n.language;
  const nestedLinks = getNestedCategories(props.links);

  return (
    <aside className='models-sidebar'>
      <p className="models-sidebar__header">
        { props.t('categories') }
      </p>
      <nav className="models-sidebar__nav">
        <li className='models-sidebar__navlink'>
          <Link
            href='/models/all'
            passHref
          >
            <a
              href="/models/all"
              className={linkClass('/models/all', 'main')}
            >
              <Icon
                icon='categories/cat-computers'
              />
              All models
              <Badge>{props.modelsCount}</Badge>
            </a>
          </Link>
        </li>
        {nestedLinks !== undefined && nestedLinks.map((link: any) => (
          <li
            key={link.id}
            className='models-sidebar__navlink'
          >
            <Link
              href={`/models/${link.categorySlug}`}
              passHref
            >
              <a
                href={`/models/${link.categorySlug}`}
                className={linkClass(`/models/${link.categorySlug}`, 'main')}
              >
                <Icon
                  icon={link.icon}
                  alt={link.categoryName[currentLanguage]}
                />
                {link.categoryName[currentLanguage]}
                <Badge>{link.modelsCount}</Badge>
              </a>
            </Link>
            {link.subcategories.length !== 0 && (
              <nav>
                {link.subcategories.map((sublink: any) => (
                  <li key={sublink.id}>
                    <Link
                      href={`/models/${sublink.categorySlug}`}
                      passHref
                    >
                      <a
                        href={`/models/${sublink.categorySlug}`}
                        className={linkClass(`/models/${sublink.categorySlug}`, 'nested')}
                      >
                        <Icon
                          icon={sublink.icon}
                          alt={sublink.categoryName[currentLanguage]}
                        />
                        {sublink.categoryName[currentLanguage]}
                        <Badge>{sublink.modelsCount}</Badge>
                      </a>
                    </Link>
                  </li>
                ))}
              </nav>
            )}
          </li>
        ))}
      </nav>
    </aside>
  );
};

export async function getInitialProps(): Promise < any > {
  return {
    namespacesRequired: ['pages-models'],
  };
}

export default withTranslation('pages-models')(ModelsSidebar);
