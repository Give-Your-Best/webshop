import * as React from 'react';
import { AccountIconBlock } from '../AccountIconBlock';
import { SignUpHeading, SignUpWrapper } from './SignUpContainer.styles';

export const SignUpContainer = () => {
  return (
      <div>
      <SignUpHeading>Would you like to Sign Up as..</SignUpHeading>
      <SignUpWrapper>
        <AccountIconBlock type='donor' />
        <AccountIconBlock type='shopper' />
      </SignUpWrapper>
      </div>
  );
};
