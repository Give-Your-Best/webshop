import React from 'react';

import { Button } from './Button';

export default {
  title: 'Example/ButtonGYB',
  component: Button,
  argTypes: {},
};

const Template = ({ label, ...args }) => <Button {...args}>{label}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Round = Template.bind({});
Round.args = {
  round: true,
  label: 'Round Button',
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
