/*
 * This file contains theme and style variables.
 *
*/

// Responsive Breakpoints

const phonePortraitMax = '575px'

const phoneLandscapeMin = '576px'

const phoneLandscapeMax = '767px'

const tabletMin = '768px'

const tabletMax = '991px'

const desktopMin = '992px'

const desktopMax = '1199px'

const desktopHDMin = '1200px'

// Media Rules

export const phonePortrait = `@media (max-width: ${phonePortraitMax})`

export const phoneLandscape = `@media (min-width: ${phoneLandscapeMin}) and (max-width: ${phoneLandscapeMax})`

export const tablet = `@media (min-width: ${tabletMin}) and (max-width: ${tabletMax})`

export const desktop = `@media (min-width: ${desktopMin}) and (max-width: ${desktopMax})`

export const desktopHD = `@media (min-width: ${desktopHDMin})`

export const phone = `@media (max-width: ${phoneLandscapeMax})`

export const phoneAndTablet = `@media (max-width: ${tabletMax})`

export const tabletAndDesktop = `@media (min-width: ${tabletMin}) and (max-width: ${desktopMax})`

export const anyDesktop = `@media (min-width: ${desktopMin})`

export const exceptPhonePortrait = `@media (min-width: ${phoneLandscapeMin})`

export const exceptPhone = `@media (min-width: ${tabletMin})`

export const light = '@media (prefers-color-scheme: light)'

export const dark = '@media (prefers-color-scheme: dark)'

// Colors

export const contentBackgroundColor = "#FFFFFF"

export const workspaceHeadingBackgroundColor = "#F6F6F6"

export const workspaceBorderColor = "#CCCCCC"

export const docTextColor = "rgb(26, 32, 44)"

export const docTextUnselectedColor = "rgb(113, 128, 150)"

export const docTextSelectedColor = "rgb(49, 130, 206)"

export const docFontFamily = "Inter, sans-serif"

export const docTitleFontFamily = "Barlow, system-ui, Arial, sans-serif"

export const docTagColor = "rgb(160, 174, 192)"

export const docTagBackgroundColor = "rgb(237, 242, 247)"

export const headerBackground = '#303846'

export const tintColor = '#0052FF'

export const contentColor = '#212121'

export const tagBackgroundColor = '#DEE4E7'

export const tagContentColor = '#4A5568'

export const footerContentColor = '#a2a2bc'

export const reversedContentColor = "#ffffff"

export const splashContentColor = "#424242"

export const tintFontStack = 'Inter,sans-serif'

export const windowBackgroundColor = '#f7fafc'

export const newAlterBackgroundColor = "#E9ECFD"

export const codeColor = '#4a5568'

export const codeBlue = '#0894ff'

export const codeGreen = '#38b2ac'

export const codePink = '#ed64a6'

export const codeOrange = '#f56565'

export const codePurple = '#d288fd'

export const lightBackground = '#ffffff'

export const darkBackground = '#111'

export const lightContent = '#181818'

export const darkContent = '#f8f8f8'

export const lightTint = '#0894ff'

export const darkTint = '#0894ff'

export const lightBorder = '#f2f2f4'

export const darkBorder = '#232324'

export const exampleBackGround = '#2c8eaa'

export const aboutBackGround = '#424242'

export const coreBackGround = '#227093'

export const pymongoBackGround = 'rgb(49, 151, 149)'

export const serverBackGround = '#474787'

export const sqlormBackGround = '#4b6584'

export const commandBackGround = '#4b4b4b'

export const codeBlockBackGround = '#C9D6DF'

// Fonts

export const titleFontStack = 'Barlow, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const contentFontStack = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const codeFontStack = 'JetBrains Mono,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace'

// Metrics

export const spacing = 8

export const margin = 20

export const codeBlockRadius = 8

export const codeBlockMargin = 8

// Shadows

export const windowBoxShadow = 'rgba(0, 0, 0, 0.07) 0px 20px 53px 0px, rgba(0, 0, 0, 0.04) 0px 4px 15px 0px, rgba(0, 0, 0, 0.024) 0px 2px 6px 0px, rgba(0, 0, 0, 0.01) 0px 0px 2px 0px'

export const shadow = "box-shadow: 0 10px 36px rgba(0, 69, 148, 0.09)"

// Mixins

export const flexContainerCenterItems = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const wholeScreen = `
  height: 100vh;
  width: 100vw;
`

export const flexRow = (alignItems: string = 'center') => `
display: flex;
flex-direction: row;
align-items: ${alignItems};
`

export const flexColumn = (alignItems: string = 'center') => `
display: flex;
flex-direction: column;
align-items: ${alignItems};
`
