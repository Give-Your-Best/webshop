import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {
  CategoryMenuWrapper,
  CategoryMenuLink,
  CategoryMenuItem,
  MainMenuNav,
  SubMenuItem,
  SubMenuNav,
} from './CategoryMenu.styles';
import { sectionConfigs, subCategories } from '../../../utils/constants';

export const CategoryMenu = () => {
  const { pathname } = useLocation();

  const activeConfig = Object.values(sectionConfigs).find((c) =>
    pathname.startsWith(c.basePath)
  );

  if (!activeConfig) return null;

  // Children uses grouped nav (Baby & Toddler, Kids, Toys & Books)
  if (activeConfig.navGroups) {
    return (
      <CategoryMenuWrapper>
        <MainMenuNav>
          {activeConfig.navGroups.map((group) => {
            const isSingle = group.subCats.length === 1;
            return (
              <CategoryMenuItem key={group.id}>
                <CategoryMenuLink to={activeConfig.basePath + '/' + group.id}>
                  {group.name}
                </CategoryMenuLink>
                {!isSingle && (
                  <SubMenuNav>
                    {group.subCats.map((s) => {
                      const id = s.id.replace('/', '-');
                      return (
                        <li key={id}>
                          <SubMenuItem
                            to={
                              activeConfig.basePath + '/' + group.id + '/' + id
                            }
                          >
                            {s.name}
                          </SubMenuItem>
                        </li>
                      );
                    })}
                  </SubMenuNav>
                )}
              </CategoryMenuItem>
            );
          })}
        </MainMenuNav>
      </CategoryMenuWrapper>
    );
  }

  // Standard sections (womenswear, menswear)
  return (
    <CategoryMenuWrapper>
      <MainMenuNav>
        {activeConfig.topLevelCategories.map((c) => {
          const isClothing = c.id === activeConfig.clothingParentCategory;
          const catSubItems =
            c.id === 'other'
              ? []
              : subCategories.filter(
                  (s) =>
                    s.parentCategory === c.id &&
                    (!s.genderRestriction ||
                      activeConfig.gender
                        ?.split(',')
                        .includes(s.genderRestriction))
                );
          return (
            <CategoryMenuItem key={c.id}>
              <CategoryMenuLink to={c.path}>{c.name}</CategoryMenuLink>
              {catSubItems.length > 0 && (
                <SubMenuNav>
                  {catSubItems.map((s) => {
                    const to = isClothing
                      ? activeConfig.basePath + '/clothing/' + s.id
                      : activeConfig.basePath + '/' + c.id + '/' + s.id;
                    return (
                      <li key={s.id}>
                        <SubMenuItem to={to}>{s.name}</SubMenuItem>
                      </li>
                    );
                  })}
                </SubMenuNav>
              )}
            </CategoryMenuItem>
          );
        })}
      </MainMenuNav>
    </CategoryMenuWrapper>
  );
};
