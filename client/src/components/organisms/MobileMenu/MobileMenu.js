import * as React from 'react';
import { AppContext } from '../../../context/app-context';
import {
  CategoryMenuWrapper,
  CategoryMenuLink,
  CategoryMenuItem,
  ExpandArrow,
  MainMenuNav,
  MenuOverlay,
  SubCategoryItem,
  SubMenuItem,
  SubMenuNav,
  Cross,
  Down,
} from './MobileMenu.styles';
import { sectionConfigs, subCategories } from '../../../utils/constants';
import { tabList, hideMobileMenu } from '../../../utils/helpers';
import { Icon } from '../HeaderMenu/HeaderMenu.styles';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';

export const MobileMenu = () => {
  const { user } = React.useContext(AppContext);
  let history = useHistory();
  const { confirm } = Modal;

  var tabs = tabList(user);

  const [openSection, setOpenSection] = React.useState(null);
  const [openCategory, setOpenCategory] = React.useState(null);
  const [openAccount, setOpenAccount] = React.useState(false);

  const showStyle = { display: 'block' };

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
    setOpenCategory(null);
  };

  const toggleCategory = (key) => {
    setOpenCategory(openCategory === key ? null : key);
  };

  const basketCheck = () => {
    if (user && user.type === 'shopper') {
      history.push(`/basket`);
      hideMobileMenu();
    } else {
      confirm({
        className: 'modalStyle',
        title: `Please sign up as a shopper to shop!`,
      });
    }
  };

  const navigate = (path) => {
    history.push(path);
    hideMobileMenu();
  };

  return (
    <>
      <MenuOverlay id="menuOverlay" onClick={hideMobileMenu} />
      <CategoryMenuWrapper id="mobileMenu">
        <MainMenuNav>
          <CategoryMenuItem key={'account icon'}>
            <CategoryMenuLink
              onClick={() => {
                if (!tabs.length) {
                  navigate('/dashboard');
                } else {
                  setOpenAccount((prev) => !prev);
                }
              }}
            >
              <Icon src="/GYB-account.svg" alt="account icon" />
              Account {tabs.length ? <Down $expanded={openAccount} /> : ''}
            </CategoryMenuLink>
            {tabs.length && openAccount ? (
              <SubMenuNav style={showStyle}>
                {tabs.map((d) => {
                  return d.name === 'Dashboard' ? (
                    ''
                  ) : (
                    <li key={d.id}>
                      <SubCategoryItem
                        onClick={() => navigate('/dashboard/' + d.id)}
                      >
                        {d.name}
                      </SubCategoryItem>
                    </li>
                  );
                })}
              </SubMenuNav>
            ) : (
              ''
            )}
          </CategoryMenuItem>

          <CategoryMenuItem key={'basket icon'}>
            <CategoryMenuLink $marginTop="10px" onClick={basketCheck}>
              <Icon src="/GYB-basket.svg" alt="account icon" />
              Basket
            </CategoryMenuLink>
          </CategoryMenuItem>

          {Object.entries(sectionConfigs).map(([sectionKey, config]) => {
            const isSectionOpen = openSection === sectionKey;

            // Children — grouped nav (Baby & Toddler, Kids, Toys & Books)
            if (config.navGroups) {
              return (
                <CategoryMenuItem key={config.basePath}>
                  <CategoryMenuLink onClick={() => toggleSection(sectionKey)}>
                    {config.label} <Down $expanded={isSectionOpen} />
                  </CategoryMenuLink>
                  {isSectionOpen && (
                    <SubMenuNav style={showStyle}>
                      {config.navGroups.map((group) => {
                        const isSingle = group.subCats.length === 1;
                        const isGroupOpen = openCategory === group.id;
                        return (
                          <li key={group.id}>
                            <SubMenuItem
                              onClick={() =>
                                isSingle
                                  ? navigate(config.basePath + '/' + group.id)
                                  : toggleCategory(group.id)
                              }
                            >
                              {group.name}{' '}
                              {!isSingle && (
                                <ExpandArrow $expanded={isGroupOpen} />
                              )}
                            </SubMenuItem>
                            {!isSingle && isGroupOpen && (
                              <SubMenuNav style={showStyle}>
                                <li key="view-all">
                                  <SubCategoryItem
                                    onClick={() =>
                                      navigate(config.basePath + '/' + group.id)
                                    }
                                  >
                                    View All
                                  </SubCategoryItem>
                                </li>
                                {group.subCats.map((s) => {
                                  const id = s.id.replace('/', '-');
                                  return (
                                    <li key={id}>
                                      <SubCategoryItem
                                        onClick={() =>
                                          navigate(
                                            config.basePath +
                                              '/' +
                                              group.id +
                                              '/' +
                                              id
                                          )
                                        }
                                      >
                                        {s.name}
                                      </SubCategoryItem>
                                    </li>
                                  );
                                })}
                              </SubMenuNav>
                            )}
                          </li>
                        );
                      })}
                    </SubMenuNav>
                  )}
                </CategoryMenuItem>
              );
            }

            // Standard sections — womenswear, menswear
            return (
              <CategoryMenuItem key={config.basePath}>
                <CategoryMenuLink onClick={() => toggleSection(sectionKey)}>
                  {config.label} <Down $expanded={isSectionOpen} />
                </CategoryMenuLink>
                {isSectionOpen && (
                  <SubMenuNav style={showStyle}>
                    {config.topLevelCategories.map((c) => {
                      const isClothing = c.id === config.clothingParentCategory;
                      const catSubItems =
                        c.id === 'other'
                          ? []
                          : subCategories.filter(
                              (s) => s.parentCategory === c.id
                            );
                      const isCatOpen =
                        openCategory === sectionKey + '-' + c.id;

                      return (
                        <li key={c.id}>
                          <SubMenuItem
                            onClick={() =>
                              catSubItems.length
                                ? toggleCategory(sectionKey + '-' + c.id)
                                : navigate(c.path)
                            }
                          >
                            {c.name}{' '}
                            {catSubItems.length > 0 && (
                              <ExpandArrow $expanded={isCatOpen} />
                            )}
                          </SubMenuItem>
                          {catSubItems.length > 0 && isCatOpen && (
                            <SubMenuNav style={showStyle}>
                              <li key="view-all">
                                <SubCategoryItem
                                  onClick={() => navigate(c.path)}
                                >
                                  View All
                                </SubCategoryItem>
                              </li>
                              {catSubItems.map((s) => {
                                const to = isClothing
                                  ? config.basePath + '/clothing/' + s.id
                                  : config.basePath + '/' + c.id + '/' + s.id;
                                return (
                                  <li key={s.id}>
                                    <SubCategoryItem
                                      onClick={() => navigate(to)}
                                    >
                                      {s.name}
                                    </SubCategoryItem>
                                  </li>
                                );
                              })}
                            </SubMenuNav>
                          )}
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
      <Cross id="cross" onClick={hideMobileMenu} />
    </>
  );
};
