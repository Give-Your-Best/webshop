import * as React from 'react';
import {
  FooterWrapper,
  FooterItem,
  FooterItemWider,
  SocialWrapper,
} from './Footer.styles';

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterItem>
        <h4>About us</h4>
        <img src="/logo2.jpg" alt="footer logo" />
        <p>
          Give Your Best C.I.C is a registered social enterprise. Company
          number: 12977907
        </p>
        <a
          href="https://www.giveyourbest.uk/safeguarding-policy"
          target="_blank"
          rel="noreferrer"
        >
          Safeguarding Policy
        </a>
        <a
          href="https://www.giveyourbest.uk/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        <a
          href="https://www.giveyourbest.uk/cookie-policy"
          target="_blank"
          rel="noreferrer"
        >
          Cookie Policy
        </a>
      </FooterItem>
      <FooterItemWider>
        <h4>Contact Us</h4>
        <p>
          To give us your feedback: fill in this{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://forms.gle/Tf2A4LbrNiPJ7fTLA"
          >
            form
          </a>{' '}
        </p>
        <p>
          For general enquiries{' '}
          <a href="mailto:enquire@giveyourbest.uk">enquire@giveyourbest.uk</a>{' '}
        </p>
        <p>
          For safeguarding concerns:{' '}
          <a href="mailto:safeguarding@giveyourbest.uk">
            safeguarding@giveyourbest.uk
          </a>{' '}
        </p>
        <p>
          Find help with donating{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://res.cloudinary.com/hnlrfgzzh/image/upload/v1739047282/How_to_Donate_cat3kn.png"
          >
            here
          </a>{' '}
        </p>
        <p>
          Find help with shopping{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://res.cloudinary.com/hnlrfgzzh/image/upload/v1739047296/How_to_shop_fuughc.pdf"
          >
            here
          </a>{' '}
        </p>
        <br />
        <strong>
          <p>
            Created by{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://code-operative.co.uk/"
            >
              Code-Operative
            </a>{' '}
          </p>
        </strong>
      </FooterItemWider>
      <FooterItem>
        <h4>Follow Us</h4>
        <SocialWrapper>
          <div>
            <a
              href="https://facebook.com/GiveYourBestUK"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="facebook logo"
                src="/assets/images/social/facebook.png"
              />
            </a>
            <a
              href="https://instagram.com/giveyourbest.uk"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="instagram logo"
                src="/assets/images/social/instagram.png"
              />
            </a>
          </div>
          <div>
            <a
              href="https://twitter.com/giveyourbest_uk"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="twitter logo" src="/assets/images/social/twitter.png" />
            </a>
            <a
              href="https://www.linkedin.com/company/giveyourbest-uk/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="linkedin logo"
                src="/assets/images/social/linkedin.png"
              />
            </a>
          </div>
        </SocialWrapper>
      </FooterItem>
    </FooterWrapper>
  );
};
