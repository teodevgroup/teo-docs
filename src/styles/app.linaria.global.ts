import { css } from '@linaria/core'

export const globals = css`
  :global() {

    @font-face {
      font-family: Mont Trial;
      src: url(/fonts/Mont-Trial-Heavy.ttf);
      font-weight: bold;
    }
    @font-face {
      font-family: Mont Trial;
      src: url(/fonts/Mont-Trial-Regular.ttf);
      font-weight: normal;
    }
    * {
      box-sizing: border-box;
    }
    a {
      color: inherit;
      text-decoration: inherit;
    }
  }
`