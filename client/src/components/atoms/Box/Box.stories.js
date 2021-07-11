import React from 'react';
import { Box } from './';

export default {
  title: 'Atoms/Box',
  component: Box,
  argTypes: {
    display: {
      description: 'Same as the `display` CSS prop',
      table: { defaultValue: { summary: 'block' } },
      type: 'string',
    },
    flex: { description: 'Same as the `flex` CSS prop', type: 'number' },
    flexDirection: {
      description: 'Same as the `flex-direction` CSS prop',
      type: 'string',
    },
    flexWrap: {
      description: 'Same as the `flex-wrap` CSS prop',
      type: 'string',
    },
    justifyContent: {
      description: 'Same as the `justify-content` CSS prop',
      type: 'string',
    },
    m: {
      description: 'Same as setting the `margin` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    mb: {
      description: 'Same as setting the `margin-bottom` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    mt: {
      description: 'Same as setting the `margin-top` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    ml: {
      description: 'Same as setting the `margin-left` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    mr: {
      description: 'Same as setting the `margin-right` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    mx: {
      description:
        'Same as setting the `margin-left` and `margin-right` CSS props in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    my: {
      description:
        'Same as setting the `margin-top` and `margin-bottom` CSS props in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    pb: {
      description: 'Same as setting the `padding-bottom` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    pt: {
      description: 'Same as setting the `padding-top` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    pl: {
      description: 'Same as setting the `padding-left` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
    pr: {
      description: 'Same as setting the `padding-right` CSS prop in `rem`',
      control: { type: 'number' },
      type: {
        summary: 'string or number',
      },
    },
  },
};

const Template = ({ flex, ...args }) => (
  <Box {...args}>
    <Box flex={flex}>
      This is a Box component. It is actually a <code>div</code> element that
      can take lots of props that update its styles.
    </Box>
    <Box flex={flex}>It is useful as a wrapper.</Box>
    <Box flex={flex}>
      Check below the <code>controls</code> tab to set some options, or click
      the <code>Docs</code> tab above for even more details.
    </Box>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  display: 'block',
};
