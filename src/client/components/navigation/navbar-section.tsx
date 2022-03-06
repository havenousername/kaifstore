import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { LinkItem } from '../../interfaces/navbars';
import { SxProps } from '@mui/system';

const NavbarSection = ({
  title,
  linkItems,
  showDivider = true,
  menuItemSx,
}: {
  title?: string;
  linkItems: LinkItem[];
  showDivider?: boolean;
  menuItemSx?: SxProps;
}) => {
  return (
    <>
      {showDivider && <Divider sx={{ margin: '2rem 0 3rem' }} />}
      {title && (
        <Typography
          variant={'caption'}
          component={'span'}
          gutterBottom
          paddingLeft={'1rem'}
        >
          {title}
        </Typography>
      )}
      <MenuList>
        {linkItems.map((navbar, key) => {
          return (
            <Link href={navbar.path} key={key}>
              <MenuItem
                aria-selected={navbar.current}
                sx={{ margin: '1rem 0', ...menuItemSx }}
              >
                <ListItemIcon>{navbar.icon}</ListItemIcon>
                <ListItemText>{navbar.name}</ListItemText>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </>
  );
};

export default NavbarSection;
