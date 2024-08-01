import React from 'react';

type IconName = 'css' | 'doc' | 'gif' | 'html' | 'js' | 'json' | 'mov' | 'pdf' | 'svg' | 'txt' | 'zip';

export type IconProps = Omit<React.HTMLProps<HTMLImageElement>, 'src'> & { name: IconName };
