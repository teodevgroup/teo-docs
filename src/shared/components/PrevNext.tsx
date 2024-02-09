import React from 'react'
import { css } from '@linaria/core'

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

export const PrevNext = () => <></>
