import { styled } from '@linaria/react'
import { phone, tablet, desktop, desktopHD } from '../styles/theme'

const Constraint = styled.div`
  position: relative;
  ${phone} {
    margin: 0 1em;
    width: calc(100% - 2em);
  }
  ${tablet} {
    margin: 0 1em;
    width: calc(100% - 2em);
  }
  ${desktop} {
    margin: 0 auto;
    width: calc(100% - 2em);
    max-width: 960px;
  }
  ${desktopHD} {
    margin: 0 auto;
    width: calc(100% - 2em);
    max-width: 1104px;
  }
`

export default Constraint
