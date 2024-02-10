import { css } from "@linaria/core"
import { dark, light } from "../styles/theme"


const RustLogoSvg = () => {
    return <svg className={css`
        #id, #r, #circle, #cog, #polygon {
            ${light} {
                stroke: black;
            }
            ${dark} {
                stroke: white;
            }
        }
        #r {
            ${dark} {
                fill: white;
                stroke: black;
            }
        }
    `} version="1.1" height="16" width="16" viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="logo" transform="translate(53, 53)">
            <path id="r" transform="translate(0.5, 0.5)" stroke-width="1" stroke-linejoin="round" d="     M -9,-15 H 4 C 12,-15 12,-7 4,-7 H -9 Z     M -40,22 H 0 V 11 H -9 V 3 H 1 C 12,3 6,22 15,22 H 40     V 3 H 34 V 5 C 34,13 25,12 24,7 C 23,2 19,-2 18,-2 C 33,-10 24,-26 12,-26 H -35     V -15 H -25 V 11 H -40 Z"/>
            <g id="gear" mask="url(#holes)">
                <circle id="circle" r="43" fill="none" stroke-width="9"/>
                <g id="cogs">
                    <polygon id="cog" stroke-width="3" stroke-linejoin="round" points="46,3 51,0 46,-3"/>
                    <use xlinkHref="#cog" transform="rotate(11.25)"/>
                    <use xlinkHref="#cog" transform="rotate(22.50)"/>
                    <use xlinkHref="#cog" transform="rotate(33.75)"/>
                    <use xlinkHref="#cog" transform="rotate(45.00)"/>
                    <use xlinkHref="#cog" transform="rotate(56.25)"/>
                    <use xlinkHref="#cog" transform="rotate(67.50)"/>
                    <use xlinkHref="#cog" transform="rotate(78.75)"/>
                    <use xlinkHref="#cog" transform="rotate(90.00)"/>
                    <use xlinkHref="#cog" transform="rotate(101.25)"/>
                    <use xlinkHref="#cog" transform="rotate(112.50)"/>
                    <use xlinkHref="#cog" transform="rotate(123.75)"/>
                    <use xlinkHref="#cog" transform="rotate(135.00)"/>
                    <use xlinkHref="#cog" transform="rotate(146.25)"/>
                    <use xlinkHref="#cog" transform="rotate(157.50)"/>
                    <use xlinkHref="#cog" transform="rotate(168.75)"/>
                    <use xlinkHref="#cog" transform="rotate(180.00)"/>
                    <use xlinkHref="#cog" transform="rotate(191.25)"/>
                    <use xlinkHref="#cog" transform="rotate(202.50)"/>
                    <use xlinkHref="#cog" transform="rotate(213.75)"/>
                    <use xlinkHref="#cog" transform="rotate(225.00)"/>
                    <use xlinkHref="#cog" transform="rotate(236.25)"/>
                    <use xlinkHref="#cog" transform="rotate(247.50)"/>
                    <use xlinkHref="#cog" transform="rotate(258.75)"/>
                    <use xlinkHref="#cog" transform="rotate(270.00)"/>
                    <use xlinkHref="#cog" transform="rotate(281.25)"/>
                    <use xlinkHref="#cog" transform="rotate(292.50)"/>
                    <use xlinkHref="#cog" transform="rotate(303.75)"/>
                    <use xlinkHref="#cog" transform="rotate(315.00)"/>
                    <use xlinkHref="#cog" transform="rotate(326.25)"/>
                    <use xlinkHref="#cog" transform="rotate(337.50)"/>
                    <use xlinkHref="#cog" transform="rotate(348.75)"/>
                </g>
                <g id="mounts">
                    <polygon id="mount" stroke-width="6" stroke-linejoin="round" points="-7,-42 0,-35 7,-42"/>
                    <use xlinkHref="#mount" transform="rotate(72)"/>
                    <use xlinkHref="#mount" transform="rotate(144)"/>
                    <use xlinkHref="#mount" transform="rotate(216)"/>
                    <use xlinkHref="#mount" transform="rotate(288)"/>
                </g>
            </g>
            <mask id="holes">
                <rect x="-60" y="-60" width="120" height="120" fill="white" />
                <circle id="hole" cy="-40" r="3" />
                <use xlinkHref="#hole" transform="rotate(72)"/>
                <use xlinkHref="#hole" transform="rotate(144)"/>
                <use xlinkHref="#hole" transform="rotate(216)"/>
                <use xlinkHref="#hole" transform="rotate(288)"/>
            </mask>
        </g>
    </svg>
}

export default RustLogoSvg