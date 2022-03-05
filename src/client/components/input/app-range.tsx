import { Slider, styled } from '@mui/material';
import { SxProps } from '@mui/system';

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#fff',
  height: 2,
  '&:before': {
    content: `''`,
    width: '6px',
    height: '6px',
    position: 'absolute',
    left: 0,
    margin: 'auto 0',
    backgroundColor: theme.palette.background.default,
    top: '40%',
    borderRadius: '50%',
    zIndex: 0,
  },
  '&:after': {
    content: `''`,
    width: '6px',
    height: '6px',
    position: 'absolute',
    right: 0,
    backgroundColor: theme.palette.background.default,
    top: '40%',
    borderRadius: '50%',
    zIndex: 0,
  },
  '& .MuiSlider-thumb': {
    zIndex: 1,
    width: 12,
    height: 12,
    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
    '&:before': {
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
    },
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
    },
    '&.Mui-active': {
      width: 20,
      height: 20,
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: theme.palette.background.default,
    opacity: 1,
  },
  '& .MuiSlider-track': {
    height: 4,
  },
}));

const AppRange = ({
  range,
  changeRange,
  minDistance = 10,
  step = 10,
  min = 0,
  max = 100,
  displayLabel = 'off',
  sx,
}: {
  range: [number, number] | number;
  minDistance: number;
  changeRange: (s: [number, number] | number) => void;
  min?: number;
  max?: number;
  step?: number;
  displayLabel?: 'on' | 'auto' | 'off';
  scale?: (v: number) => number;
  sx?: SxProps;
}) => {
  const onRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      changeRange(newValue);
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        changeRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        changeRange([clamped - minDistance, clamped]);
      }
    } else {
      changeRange(newValue as [number, number]);
    }
  };
  return (
    <>
      <StyledSlider
        value={range}
        onChange={onRangeChange}
        valueLabelDisplay={displayLabel}
        step={step}
        min={min}
        max={max}
        getAriaValueText={(v: number) => String(v)}
        disableSwap
        sx={sx}
      />
    </>
  );
};

export default AppRange;
