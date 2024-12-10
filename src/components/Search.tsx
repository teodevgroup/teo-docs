'use client'

import { styled } from "@linaria/react"
import { dark, light } from "../styles/theme"

export const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  left: 10px;
  svg {
    ${light} {
      stroke: rgb(203, 213, 224);
    }
    ${dark} {
      stroke: rgb(109, 115, 121);
    }
  }
`

export const SearchIcon = () => {
  return <svg fill="none" height="24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" x2="16.65" y1="21" y2="16.65"/>
  </svg>
}

export const SearchInput = styled.input`
  ${light} {
    border: 1px solid rgb(203, 213, 224);
  }
  ${dark} {
    border: 1px solid rgb(57, 60, 63);
  }
  border-radius: 8px;
  width: 100%;
  height: 44px;
  padding-left: 40px;
  padding-right: 12px;
  outline: none;
  user-select: none;
  font-size: 16px;
  &::placeholder {
    ${light} {
      color: rgb(203, 213, 224);
    }
    ${dark} {
      color: rgb(75, 79, 84);
    }
  }
`

export const FullWidthSearchInputContainer = styled.div`
  position: relative;
  margin-top: 0;
  width: 100%;
`

export const FullWidthSearchInput = ({ defaultValue }: {
    defaultValue?: string
}) => {
  return <FullWidthSearchInputContainer>
    <SearchInput defaultValue={defaultValue} placeholder='Search Docs...' onKeyUp={(e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`
      }
    }} />
    <SearchIconContainer>
      <SearchIcon />
    </SearchIconContainer>
  </FullWidthSearchInputContainer> 
}
