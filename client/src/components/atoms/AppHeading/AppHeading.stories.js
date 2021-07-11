import React from 'react';
import { AppHeading } from './';

export default {
  title: 'Atoms/AppHeading',
  component: AppHeading,
  argTypes: {},
};

const Template = ({ label, ...args }) => (
  <AppHeading {...args}>{label}</AppHeading>
);

export const Default = Template.bind({});
Default.args = {
  label: 'This is the app heading',
};
