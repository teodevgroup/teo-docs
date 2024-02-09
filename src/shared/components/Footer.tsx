import React from 'react'
import { styled } from '@linaria/react'
import Constraint from './Constraint'
import { flexColumn, flexRow, tintFontStack, margin, anyDesktop, phoneAndTablet, docFontFamily, light, dark } from '../styles/theme'
import { HeadingGitHubButton, HeadingLogo, HeadingPatreonButton, HeadingSlackButton, HeadingTwitterButton } from './Heading'

const FooterContainer = styled(Constraint)`
  border-top: 1px solid rgb(226, 232, 240);
  ${anyDesktop} {
    ${flexRow('flex-start')}
  }
  ${phoneAndTablet} {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    border-top: 1px solid #f2f2f4;
  }
  font-family: ${tintFontStack};
  justify-content: space-between;
  margin-bottom: ${margin * 6}px;
  padding-top: ${margin * 3}px;
  font-weight: 400;
`

const FooterSection = styled.ul`
  margin: 0;
  padding: 0;
  font-family: ${docFontFamily};
  ${anyDesktop} {
    ${flexColumn('flex-start')}
    margin-left: ${margin * 4}px;
  }
  ${phoneAndTablet} {
    ${flexColumn('center')}
  }
`

const FooterIconSection = styled.div`
  ${flexRow('center')}
  gap: 20px;
  ${phoneAndTablet} {
    margin-bottom: 32px;
    margin-top: 40px;
  }
  svg {
    ${light} {
      fill: black;
    }
    ${dark} {
      fill: white;
    }
  }
`

const FooterTextSection = styled(FooterSection)`
  flex-grow: 1;
  margin-left: 0;
  ${phoneAndTablet} {
    margin-top: 20px;
  }
`

const FooterCopyright = styled.div`
  margin-top: 24px;
  ${light} {
    color: #424244;
  }
  ${dark} {
    color: #F0F0F0;
  }
  line-height: 1.5;
  font-size: 18px;
  margin-top: 20px;
  ${phoneAndTablet} {
    align-self: flex-start;
  }
`

const Footer = () => <FooterContainer>
  <FooterTextSection>
    <HeadingLogo />
    <FooterCopyright>
    © 2022 - 2024 Fillmula Inc.
    </FooterCopyright>
  </FooterTextSection>
  <FooterIconSection>
    <HeadingTwitterButton />
    <HeadingSlackButton />
    <HeadingGitHubButton />
    <HeadingPatreonButton />
  </FooterIconSection>
</FooterContainer>

export default Footer
