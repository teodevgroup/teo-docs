import { styled } from '@linaria/react'
import { ReactElement } from 'react'
import { spacing } from '../styles/theme'

type HSpaceProps = {
  width?: number | string
}

// const HSpace = styled.div<HSpaceProps>`
//   width: ${props => (props.width ?? spacing)}px;
// `;

const HSpace: (props: HSpaceProps) => ReactElement = ({ width = spacing }) => {
  return <div style={{ width }} />
}

export default HSpace
