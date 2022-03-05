import { SvgIcon, SvgIconProps } from '@mui/material';
import { ReactNode } from 'react';

const AppIcon = (props: SvgIconProps & { source?: ReactNode }) => {
  return <SvgIcon {...props}>{props.children ?? props.source}</SvgIcon>;
};

export default AppIcon;
