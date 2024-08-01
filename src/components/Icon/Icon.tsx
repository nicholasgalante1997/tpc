import React, { memo } from 'react';

import { IconProps } from './Icon.types';

function Icon({ name, ...rest }: IconProps) {
  return <img {...rest} src={`/assets/${name}-icon.svg`} />;
}

export default memo(Icon);
