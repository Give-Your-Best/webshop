import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StyledBreadcrumbs } from './CategoryBreadcrumbs.styles';
import { sectionConfigs, subCategories } from '../../../utils/constants';

// There are three levels (Section e.g. "Womenswear", Category e.g. "Accessories", subCategory e.g. "Bags")
const getLabelForSegment = (seg) => {
  // Is it a section root? e.g. 'menswear', 'womenswear', 'children'
  if (sectionConfigs[seg]) {
    return sectionConfigs[seg].label;
  }

  // Is it a top-level category within a section? e.g. 'accessories', 'shoes'
  const allTopLevel = Object.values(sectionConfigs).flatMap(
    (s) => s.topLevelCategories
  );

  const topLevel = allTopLevel.find((c) => c.id === seg);
  if (topLevel) {
    return topLevel.name;
  }

  // Is it a navGroup? e.g. 'baby-toddler', 'kids', 'toys'
  const allNavGroups = Object.values(sectionConfigs)
    .filter((s) => s.navGroups)
    .flatMap((s) => s.navGroups);
  const navGroup = allNavGroups.find((g) => g.id === seg);
  if (navGroup) {
    return navGroup.name;
  }

  // Is it a subcategory? e.g. 'dresses', 'bags', 'men-tops', '12-36-month'
  const sub = subCategories.find(
    (s) => s.id === seg || s.id.replace('/', '-') === seg
  );
  if (sub) {
    return sub.name;
  }

  return seg; // fallback: show raw segment
};

export const CategoryBreadcrumbs = ({ crumbs }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  // Mode B: caller provides explicit crumbs (Item page, DonorProducts)
  if (crumbs && crumbs.length) {
    return (
      <StyledBreadcrumbs separator=">">
        <StyledBreadcrumbs.Item onClick={() => history.push('/')}>
          Home
        </StyledBreadcrumbs.Item>
        {crumbs.map((c, i) => (
          <StyledBreadcrumbs.Item key={i} onClick={() => history.push(c.path)}>
            {c.label}
          </StyledBreadcrumbs.Item>
        ))}
      </StyledBreadcrumbs>
    );
  }

  // Mode A: derive crumbs from the current URL
  let builtPath = '';
  const pathCrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((seg) => {
      builtPath += '/' + seg;
      return { label: getLabelForSegment(seg), path: builtPath };
    });

  if (!pathCrumbs.length) return null;

  return (
    <StyledBreadcrumbs separator=">">
      <StyledBreadcrumbs.Item onClick={() => history.push('/')}>
        Home
      </StyledBreadcrumbs.Item>
      {pathCrumbs.map((c, i) => (
        <StyledBreadcrumbs.Item key={i} onClick={() => history.push(c.path)}>
          {c.label}
        </StyledBreadcrumbs.Item>
      ))}
    </StyledBreadcrumbs>
  );
};
