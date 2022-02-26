import { alpha, InputBase, styled } from '@mui/material';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { SearchbarProps } from '../interfaces/searchbar';
import { lighten } from '@mui/system/colorManipulator';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[500]}`,
  backgroundColor: 'transparent',
  transition: theme.transitions.create('background-color'),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.2),
    'input::placeholder': {
      color: lighten(theme.palette.grey[500], 0.8),
    },
  },
  width: '100%',
  maxWidth: '500px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 4),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontWeight: 'bold',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 3),
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: lighten(theme.palette.grey[500], 0.3),
    },
  },
}));

const AppSearchbar = ({
  placeholder,
  value,
  onChange,
  iconSx,
  sx,
}: SearchbarProps) => {
  return (
    <Search sx={sx}>
      <SearchIconWrapper sx={iconSx}>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Search>
  );
};

export default AppSearchbar;
