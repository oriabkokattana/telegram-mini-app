import * as stylex from '@stylexjs/stylex';

import { styles } from './AnimatedGlobe.styles';

const AnimatedGlobe = () => {
  return (
    <svg
      width='48'
      height='48'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className='globe-container'
    >
      {/* Static part of the globe (equator and outer border) */}
      <rect width='48' height='48' rx='12' fill='url(#pattern0_949_40744)' />
      <rect x='9' y='9' width='30' height='30' rx='15' stroke='#583BE8' strokeWidth='2' />
      <path
        opacity='0.5'
        d='M39 24C39 25.0609 37.4196 26.0783 34.6066 26.8284C31.7936 27.5786 27.9782 28 24 28C20.0218 28 16.2064 27.5786 13.3934 26.8284C10.5804 26.0783 9 25.0609 9 24'
        stroke='#583BE8'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeDasharray='0.1 3'
      />

      {/* Rotating smaller meridian lines */}
      <g {...stylex.props(styles.rotatingLines)}>
        {/* Meridian 1 */}
        <path
          d='M24,10 A14,14 0 0,1 24,38'
          stroke='#583BE8'
          strokeWidth='0.5'
          fill='none'
          transform='rotate(15 24 24)'
        />
        {/* Meridian 2 */}
        <path
          d='M24,10 A14,14 0 0,0 24,38'
          stroke='#583BE8'
          strokeWidth='0.5'
          fill='none'
          transform='rotate(-15 24 24)'
        />
      </g>

      <defs>
        <pattern
          id='pattern0_949_40744'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_949_40744' />
        </pattern>
        <image
          id='image0_949_40744'
          width='1'
          height='1'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC'
        />
      </defs>
    </svg>
  );
};

export default AnimatedGlobe;
