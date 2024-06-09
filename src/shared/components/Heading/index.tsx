'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import Constraint from '../Constraint'
import { contentBackgroundColor, flexRow, tintFontStack, tintColor, phone, tablet, anyDesktop, flexColumn, light, dark, darkContentBackGroundColor, darkHeadingBackgroundColor, tabletAndDesktop, exceptPhone } from '../../styles/theme'
import { Menu } from 'react-feather'
import { usePathname } from 'next/navigation'
import GitHubIcon from './GitHubIcon'
import SlackIcon from './SlackIcon'
import XIcon from './XIcon'
import PatreonIcon from './PatreonIcon'

interface HeadingMenuButtonProps {
  showMenu: boolean;
}

const HeadingMenuButton = styled.button<HeadingMenuButtonProps>`
  color: ${tintColor};
  border: none;
  user-select: none;
  background-color: transparent;
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-right: 0;
  display: none;
  
  ${phone} {
    display: flex;
    position: fixed;
    top: 29px;
    right: 1em;
    z-index: ${props => (props.showMenu ? '4000' : '2000')};
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }

  ${light} {
    background-color: #f8f8fa;
  }

  ${dark} {
    background-color: ${darkHeadingBackgroundColor};
  }
`

const HeadingContainer = styled.div`
  overflow-y: hidden;
  ${light} {
    border-bottom: 1px solid #e2e8f0;
  }
  ${dark} {
    
  }
`

const HeadingBorderLine = styled.div`
  background-color: #0052ff;
  height: 4px;
`

const HeadingContentContainer = styled.div`
  z-index: 50;
  ${light} {
    background-color: ${contentBackgroundColor};
  }
  ${dark} {
    background-color: ${darkHeadingBackgroundColor};
  }
  box-shadow: 0 0 10px rgb(0 0 0 / 7%);
  height: 92px;
`

const HeadingConstraint = styled(Constraint)`
  color: ${tintColor};
  ${flexRow('stretch')}
  font-family: ${tintFontStack};
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
  font-weight: 300;
  height: 100%;
`

const HeadingMenuContainer = styled.div`
  ${anyDesktop} {
    display: none !important;
  }
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  display: none;
  ${phone} {
    position: fixed;
    top: 0%;
    min-height: 100vh;
    z-index: 3000;
    overflow: hidden;
  }
  ${light} {
    background-color: white;
  }
  ${dark} {
    background-color: ${darkHeadingBackgroundColor};
  }
  z-index: 1;
  flex-direction: column;
`

const HeadingLogoContainer = styled.div`
  ${flexRow('center')}
`

const HeadingNavArea = styled.div`
  ${flexRow('baseline')}
  margin-left: 80px;
  ${phone} {
    display: none;
  }
`

const HeadingLeft = styled.div`
  ${flexRow('stretch')}
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
  ${light} {
    color: #424242;
  }
  ${dark} {
    color: white;
  }
  margin: 0;
  ${phone} {
    ${flexColumn('center')}
    align-items: flex-start;
    position: absolute;
    top: 92px;
  }
  ${exceptPhone} {
    ${flexRow('stretch')}
    align-items: center;
    height: 100%;
  }
`

const HeadingNavItem = styled.li`
  padding: 0;
  margin-right: 18px;
  height: 100%;
  ${phone} {
    &:first-child {
      margin-top: 16px;
    }
    &:last-child {
      margin-bottom: 16px;
    }
    margin-bottom: 8px;
  }
`

const HeadingLogoA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeadingNavItemANoEffect = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  ${phone} {
    padding: 4px 16px;
  }
  color: unset;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  font-size: 16px;
`

interface HeadingNavItemAProps {
  selected: boolean
}

const HeadingNavItemA = styled.a<HeadingNavItemAProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${phone} {
    padding: 10px 16px;
  }
  ${exceptPhone} {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 6px;
    ${light} {
      border-bottom: 2px solid ${props => (props.selected ? tintColor : 'white')};
    }
    ${dark} {
      border-bottom: 2px solid ${props => (props.selected ? tintColor : darkHeadingBackgroundColor)};
    }
    &:hover {
      border-bottom: 2px solid ${tintColor};
    }
  }
  transition: all 0.2s ease-in-out 0s;
  color: unset;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  font-size: 16px;
  height: 100%;
`

const HeadingLogoNavItemA = styled(HeadingNavItemANoEffect)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const HeadingLogoImageContainer = styled.div`
  display: flex;
  margin-right: 8px;
`

const HeadingLogoDocs = styled.a`
  font-size: 30px;
  margin-left: 8px;
  ${light} {
    color: #535353;
  }
  ${dark} {
    color: #DEDEDE;
  }
`

const HeadingLogoText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-left: 4px;
  ${light} {
    color: black;
  }
  ${dark} {
    color: white;
  }
`

export const HeadingLogoImage = () => <Image alt="Logo" src={'/images/logo/logo.png'} width={45} height={45} />

export const HeadingLogo = () => <HeadingLogoContainer>
  <HeadingLogoA href='https://teodev.io'>
    <HeadingLogoImageContainer>
      <HeadingLogoImage />
    </HeadingLogoImageContainer>
    <HeadingLogoText>TEO</HeadingLogoText>
  </HeadingLogoA>
  <HeadingLogoDocs href='/'>
    Docs
  </HeadingLogoDocs>
</HeadingLogoContainer>

const HeadingNavItemsReused = () => {
  const pathname = usePathname()
  return <HeadingNavItems>
    <HeadingNavItem>
      <HeadingNavItemA href='/getting-started' selected={pathname.startsWith('/getting-started')}>Get Started</HeadingNavItemA>
    </HeadingNavItem>
    <HeadingNavItem>
      <HeadingNavItemA href='/concepts' selected={pathname.startsWith('/concepts')}>Concepts</HeadingNavItemA>
    </HeadingNavItem>
    <HeadingNavItem>
      <HeadingNavItemA href='/guides' selected={pathname.startsWith('/guides')}>Guides</HeadingNavItemA>
    </HeadingNavItem>
    <HeadingNavItem>
      <HeadingNavItemA href='/reference' selected={pathname.startsWith('/reference')}>Reference</HeadingNavItemA>
    </HeadingNavItem>
  </HeadingNavItems>
}

const HeadingIconA = styled.a`
  color: #424242;
  transition: 0.2s all ease-in-out 0s;
  &:hover {
    color: #212121;
  }
`

const HeadingIconLinks = styled.div`
  display: flex;
  gap: 20px;
  ${tablet} {
    display: none;
  }
  ${phone} {
    display: none;
  }
  ${dark} {
    svg {
      fill: white;
      &:hover {
        fill: white;
      }
    }
  }
  ${light} {
    svg {
      fill: #212121;
    }
  }
`

export const HeadingPatreonButton = () => {
  return <HeadingIconA href='https://www.patreon.com/victorteo' target="_blank">
    <PatreonIcon width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

export const HeadingTwitterButton = () => {
  return <HeadingIconA href='https://twitter.com/victorteokw' target="_blank">
    <XIcon width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

export const HeadingSlackButton = () => {
  return <HeadingIconA href='https://teocloud.slack.com' target="_blank">
    <SlackIcon width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

export const HeadingGitHubButton = () => {
  return <HeadingIconA href='https://github.com/teodevgroup/teo' target="_blank">
    <GitHubIcon width={32} height={32} style={{
      transition: "0.2s all ease-in-out 0s"
    }} />
  </HeadingIconA>
}

const Heading = () => {
  const [showMenu, setShowMenu] = useState(false)
  return <HeadingContainer>
    <HeadingBorderLine />
    <HeadingContentContainer>
      <HeadingMenuContainer className={showMenu ? css`
        display: flex;
      ` : css`
        display: none;
      `}>
        <HeadingNavItemsReused />
        <HeadingIconLinks>
          <HeadingGitHubButton />
        </HeadingIconLinks>
      </HeadingMenuContainer>
      <HeadingConstraint>
        <HeadingLeft>
          <HeadingLogo />
          <HeadingNavArea>
            <HeadingNavItemsReused />
          </HeadingNavArea>
        </HeadingLeft>
        <HeadingRight>
          <HeadingIconLinks>
            <HeadingGitHubButton />
          </HeadingIconLinks>
          <HeadingMenuButton onClick={() => setShowMenu(!showMenu)} showMenu={showMenu}>
            <Menu size={20} />
          </HeadingMenuButton>
        </HeadingRight>
      </HeadingConstraint>
    </HeadingContentContainer>
  </HeadingContainer>
}

export default Heading
