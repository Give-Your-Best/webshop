import React from 'react';
import { Link } from './Link';

export default {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {},
};

const Template = ({ label, ...args }) => <Link {...args}>{label}</Link>;

export const Default = Template.bind({});
Default.args = {
  label: 'This is the link',
  href: 'http://example.com',
  target: '_blank',
};
