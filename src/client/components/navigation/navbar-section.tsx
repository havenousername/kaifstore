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

const NavbarSection = ({
  title,
  linkItems,
  showDivider = true,
}: {
  title?: string;
  linkItems: LinkItem[];
  showDivider?: boolean;
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
                sx={{ margin: '1rem 0' }}
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
