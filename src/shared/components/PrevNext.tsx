import React, { ReactNode } from 'react'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { flexRow } from '../styles/theme'

const PrevIcon = () => {
  return <svg className={css`
    transform: rotate(180deg);
    margin-right: 4px;
  `} width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z" fill="#A0AEC0"></path></svg>
}

const NextIcon = () => {
  return <svg className={css`
    margin-left: 4px;
  `} width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.724246C0 0.111374 0.681914 -0.223425 1.13107 0.168926L4.66916 3.25957C5.11028 3.6449 5.11028 4.3551 4.66916 4.74043L1.13107 7.83107C0.681913 8.22342 0 7.88863 0 7.27575V0.724246Z" fill="#A0AEC0"></path></svg>
}

type PrevNextProps = {
  children: ReactNode
  href: string
}

const PrevNextA = styled.a`
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  text-decoration: none !important;
  padding: 11px 14px;
  color: #40404c !important;
  border-radius: 8px;
  &:not(:last-child) {
    margin-right: 20px;
  }
`

const PrevNextLabel = styled.div`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: rgb(113,128,150) !important;
  line-height: 1.4 !important;
`

const PrevLabel = styled(PrevNextLabel)`
  align-self: flex-start;
`

const NextLabel = styled(PrevNextLabel)`
  align-self: flex-end;
`

const PrevTitle = styled.div`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4 !important;
`

export const PrevArticle = (props: PrevNextProps) => {
  return <PrevNextA href={props.href}>
    <PrevLabel>
      <PrevIcon />
      PREV
    </PrevLabel>
    <PrevTitle>{props.children}</PrevTitle>
  </PrevNextA>
}

export const NextArticle = (props: PrevNextProps) => {
  return <PrevNextA href={props.href}>
    <NextLabel>
      NEXT
      <NextIcon />
    </NextLabel>
    <PrevTitle>{props.children}</PrevTitle>
  </PrevNextA>
}

export const PrevNext = () => <></>

// styled.div`
//   ${flexRow('center')}
//   justify-content: space-between;
//   margin-top: 40px;
// `
