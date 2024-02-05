import { styled } from '@linaria/react'
import { spacing } from '../styles/theme'

type VSpaceProps = {
  height?: number | string
}

const VSpace = styled.div<VSpaceProps>`
  height: ${props => (props.height ?? spacing)}px;
`

export default VSpace
