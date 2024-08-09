import React from 'react';

type IconName = 'css' | 'doc' | 'gif' | 'html' | 'js' | 'json' | 'mov' | 'pdf' | 'svg' | 'txt' | 'zip' | 'left-arrow' | 'right-arrow';

export type IconProps = Omit<React.HTMLProps<HTMLImageElement>, 'src'> & { name: IconName };
