import { AppMultiSelect, SelectValue } from '../../interfaces/input-props';
import { Box, FormGroup, List, ListItem, Typography } from '@mui/material';
import { StandardInput } from './app-input';
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';

import DropdownPopper from '../common/dropdown-popper';
import AppTag from '../common/app-tag';

const AppSearchSelect = (props: AppMultiSelect) => {
  const [options, setOptions] = useState<SelectValue[]>(props.values ?? []);
  const [optionsFiltered, setOptionsFiltered] = useState<SelectValue[]>(
    options ?? [],
  );

  const [assignedSelected, setAssignedSelected] = useState(false);

  useEffect(() => {
    if (!assignedSelected && props.selected.length > 0) {
      setAssignedSelected(true);
      setSelected(props.selected);
    }
  }, [assignedSelected, props.selected]);

  const [selected, setSelected] = useState<SelectValue[]>(props.selected ?? []);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  const [inputValue, setInputValue] = useState('');
  const [popperModifiers] = useState([
    { name: 'offset', options: { offset: [0, 10] } },
  ]);

  const onInputClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setOpen((prevState) => !prevState);
  };

  const handleOpenPopper = (b: boolean) => {
    setOpen(b);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setOpen(true);
    setOptionsFiltered(
      options.filter((i) =>
        typeof i.content === 'string'
          ? i.content.includes(e.target.value)
          : true,
      ),
    );
  };

  const handleInputSubmit = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      const found = options.find(
        (v) => v.value === inputValue && v.content === inputValue,
      );
      if (found) {
        return;
      }
      setOptions((prevState) => [
        ...prevState,
        { value: inputValue, content: inputValue },
      ]);
      setOpen(false);
    }
  };

  const findSelected = (value: SelectValue) => {
    return selected.find(
      (v) => v.value === value.value && v.content === value.content,
    );
  };

  const onOptionClick = (value: SelectValue) => {
    const found = findSelected(value);
    if (found) {
      const filtered = selected.filter(
        (st) => st.value !== found.value && st.content !== found.content,
      );
      setSelected(filtered);
    } else {
      setSelected((prevState) => [...prevState, value]);
    }
    props.onOptionChange(options);
    setOpen(false);
  };

  return (
    <FormGroup>
      <StandardInput
        onClick={onInputClick}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
        placeholder={props.placeholder ?? 'Select option'}
        error={props.error}
        sx={props.sxInput}
      />
      <Box
        display={'flex'}
        sx={{
          maxWidth: '250px',
          flexWrap: 'wrap',
          my: '1rem',
        }}
      >
        {selected.map((value, key) => (
          <AppTag
            index={key}
            key={value.value}
            tag={value.content}
            sx={{ marginRight: '1rem', width: '50px', my: '0.2rem' }}
          />
        ))}
      </Box>
      <DropdownPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleOpen={handleOpenPopper}
        modifiers={popperModifiers}
        sxRoot={{
          transition:
            'opacity 263ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 175ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          border: 'none',
          boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
          backgroundColor: 'background.default',
        }}
      >
        <List
          sx={{
            width: '250px',
            ...props.sxList,
          }}
        >
          {optionsFiltered.length === 0 && (
            <Typography variant={'h6'}>
              {props.noElements ?? 'No elements'}
            </Typography>
          )}
          {optionsFiltered.map((value, key) => (
            <ListItem
              key={key}
              sx={{
                cursor: 'pointer',
                transition: '0.2s all ease-in',
                borderRadius: '10px',
                my: '0.5rem',
                '&:hover': {
                  backgroundColor: 'background.paper',
                },
                '&[aria-selected="true"]': {
                  backgroundColor: 'primary.main',
                },
                ...props.sxListItem,
              }}
              id={value.value}
              onClick={() => onOptionClick(value)}
              aria-selected={!!findSelected(value)}
            >
              {value.content}
            </ListItem>
          ))}
        </List>
      </DropdownPopper>
    </FormGroup>
  );
};

export default AppSearchSelect;
