import { styled } from '@mui/material';
import React, { ReactNode, useCallback, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { ReactComponent as ArrowForwardIcon } from '../assets/icons/arrow-forward.svg';
import { AccordionPropData } from '../interfaces/accordions';
import { Theme } from '@mui/material/styles';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme, expanded }: AccordionProps & { theme?: Theme }) => ({
  '&:before': {
    opacity: 0,
  },
  transition: 'all 0.2s ease-in',
  '&:hover': {
    backgroundColor: expanded ? 'transparent' : theme.palette.background.paper,
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIcon />} {...props} />
))(
  ({
    theme,
    showIcon,
  }: AccordionSummaryProps & { theme?: Theme } & { showIcon: boolean }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'rotate(0deg) scale(0.3)',
      display: showIcon ? 'block' : 'none',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg) scale(0.3)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
      paddingLeft: showIcon ? 0 : '2.3rem',
    },
  }),
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const AccordionDetailsInner = ({
  details,
}: {
  details: string | ReactNode | AccordionPropData[];
}) => {
  if (Array.isArray(details)) {
    return <AppAccordion data={details} />;
  } else {
    return <>{details}</>;
  }
};

const AppAccordion = ({
  data,
  expanded,
  onChange,
}: {
  data: AccordionPropData[];
  expanded?: string | boolean;
  onChange?: () => void;
}) => {
  const [expandedTab, setExpanded] = useState(expanded ?? false);

  const handleChange =
    (panel: string, data: AccordionPropData) =>
    (event: React.SyntheticEvent, newExpanded: boolean) => {
      console.log(data);
      if (Array.isArray(data.details) && data.details.length === 0) {
        return;
      }
      if (onChange) {
        onChange();
      } else {
        setExpanded(newExpanded ? panel : false);
      }
    };

  const showIcon = useCallback(
    (details: string | ReactNode | AccordionPropData[]) =>
      Array.isArray(details) && details.length > 0,
    [],
  );

  return (
    <>
      {data.map((accordion, key) => (
        <Accordion
          key={key}
          expanded={expandedTab === accordion.name}
          onChange={handleChange(accordion.name, accordion)}
        >
          <AccordionSummary
            aria-controls={
              accordion.ariaControls ?? accordion.name + 'controls'
            }
            id={
              accordion.id ?? accordion.name + Math.floor(Math.random() * 1000)
            }
            showIcon={showIcon(accordion.details)}
          >
            {accordion.summary}
          </AccordionSummary>
          {accordion.details && (
            <AccordionDetails>
              <AccordionDetailsInner details={accordion.details} />
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </>
  );
};

export default AppAccordion;
