import React, { useState } from 'react'
import Image from 'next/image'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import Constraint from '../Constraint'
import { contentBackgroundColor, flexRow, tintFontStack, margin, reversedContentColor, spacing, tintColor, phone, tablet, phoneAndTablet, anyDesktop, flexColumn } from '../../styles/theme'
import { Menu } from 'react-feather'
import patreonIcon from './patreon.svg'
import githubIcon from './github.svg'
import slackIcon from './slack.svg'
import xIcon from './x-twitter.svg'

const HeadingMenuButton = styled.button`
  color: ${tintColor};
  border: none;
  user-select: none;
  background-color: transparent;
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-right: -10px;
  display: none;
  
  ${phoneAndTablet} {
    display: block;
  }
`

const HeadingContainer = styled.div`
  border-bottom: 1px solid #e2e8f0;
`

const HeadingBorderLine = styled.div`
  background-color: #0052ff;
  height: 4px;
  color: white;
`

const HeadingContentContainer = styled.div`
  z-index: 50;
  background-color: ${contentBackgroundColor};
  box-shadow: 0 0 10px rgb(0 0 0 / 7%);
  position: relative;
`

const HeadingConstrait = styled(Constraint)`
  color: ${tintColor};
  ${flexRow('center')}
  font-family: ${tintFontStack};
  justify-content: space-between;
  padding-top: ${margin}px;
  padding-bottom: ${margin}px;
  font-weight: 300;
`

const HeadingMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  display: none;
  background-color: white;
  box-shadow: 0 0 10px rgb(0 0 0 / 7%);
  z-index: 1;
  flex-direction: column;
`

const show = css`
  display: flex;
`

const HeadingLogoContainer = styled.div``

const HeadingNavArea = styled.div`
  ${flexRow('center')}
  ${phoneAndTablet} {
    display: none;
  }
`

const HeadingLeft = styled.div`
  ${flexRow('center')}
  ${anyDesktop} {
    margin-right: 40px;
  }
`

const HeadingRight = styled.div`
${flexRow('center')}
`

const HeadingNavItems = styled.ul`
  padding: 0;
  list-style: none;
  color: #424242;
  ${phoneAndTablet} {
    ${flexColumn('center')}
    align-items: flex-start;
  }
  ${anyDesktop} {
    ${flexRow('center')}
    align-items: center;
  }
`

const HeadingNavItem = styled.li`
  padding: 0;
  margin-right: 36px;
  ${phoneAndTablet} {
    padding: 10px 16px;
  }
`

const HeadingNavItemA = styled.a`
  color: unset;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  font-size: 16px;
`

const HeadingLogoNavItemA = styled(HeadingNavItemA)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const HeadingLogoImageContainer = styled.div`
  display: flex;
  margin-right: 8px;
`

export const HeadingLogoImage = () => <Image alt="Logo" src={'/images/logo/newlogo.png'} width={122} height={50} />

export const HeadingLogo = () => <HeadingLogoContainer>
<HeadingLogoNavItemA href='/'>
  <HeadingLogoImageContainer>
    <HeadingLogoImage />
  </HeadingLogoImageContainer>
  {/* <HeadingLogoText>
    TEO <span style={{fontWeight: 400}}>Cloud</span>
  </HeadingLogoText> */}
</HeadingLogoNavItemA>
</HeadingLogoContainer>

const HeadingNavItemsReused = () => {
  return <HeadingNavItems>
    <HeadingNavItem>
      <HeadingNavItemA href='/getting-started'>Get Started</HeadingNavItemA>
    </HeadingNavItem>
    <HeadingNavItem>
      <HeadingNavItemA href='/concepts'>Concepts</HeadingNavItemA>
    </HeadingNavItem>
    <HeadingNavItem>
      <HeadingNavItemA href='/guides'>Guides</HeadingNavItemA>
    </HeadingNavItem>
    <HeadingNavItem>
      <HeadingNavItemA href='/reference'>Reference</HeadingNavItemA>
    </HeadingNavItem>
  </HeadingNavItems>
}

const HeadingIconA = styled.a`
  color: #424242;
  transition: 0.2s all ease-in-out 0s;
  :hover {
    color: #212121;
  }
`

const HeadingIconLinks = styled.div`
  ${tablet} {
    display: none;
  }
  ${phone} {
    display: none;
  }
`

export const HeadingPatreonButton = () => {
  return <HeadingIconA href='https://www.patreon.com/victorteo' target="_blank">
    <Image src={patreonIcon} alt="Patreon Icon" width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

export const HeadingTwitterButton = () => {
  return <HeadingIconA href='https://twitter.com/victorteokw' target="_blank">
    <Image src={xIcon} alt="X Icon" width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

export const HeadingSlackButton = () => {
  return <HeadingIconA href='https://teocloud.slack.com' target="_blank">
    <Image src={slackIcon} alt="Slack Icon" width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

export const HeadingGitHubButton = () => {
  return <HeadingIconA href='https://github.com/teocloud/teo' target="_blank">
    <Image src={githubIcon} alt="GitHub Icon" width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

const Heading = () => {
  const [showMenu, setShowMenu] = useState(false)
  return <HeadingContainer>
    <HeadingBorderLine />
    <HeadingContentContainer>
      <HeadingMenuContainer className={showMenu ? show : ''}>
        <HeadingNavItemsReused />
        <HeadingIconLinks>
          <HeadingGitHubButton />
        </HeadingIconLinks>
      </HeadingMenuContainer>
      <HeadingConstrait>
        <HeadingLeft>
          <HeadingLogo />
        </HeadingLeft>
        <HeadingRight>
          <HeadingNavArea>
            <HeadingNavItemsReused />
          </HeadingNavArea>
          <HeadingIconLinks>
            <HeadingGitHubButton />
          </HeadingIconLinks>

          {/* <HeadingButton onClick={(e) => {
            e.preventDefault()
            window.location.href = "https://workspace.teocloud.io"
          }}>Workspace</HeadingButton> */}
          <HeadingMenuButton onClick={() => setShowMenu(!showMenu)}>
            <Menu size={20} />
          </HeadingMenuButton>
        </HeadingRight>
      </HeadingConstrait>
    </HeadingContentContainer>
  </HeadingContainer>
}

export default Heading
