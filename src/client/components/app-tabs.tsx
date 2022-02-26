import { Box, Tab, Tabs } from '@mui/material';
import { AppTabsProps } from '../interfaces/tabs-props';
import { ReactNode } from 'react';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ paddingY: 2 }}>{children}</Box>}
    </div>
  );
}

const AppTabs = ({ currentTab, onChange, items, ariaLabel }: AppTabsProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'common.white',
            },
          }}
          value={currentTab}
          onChange={(e, newValue: number) => onChange(newValue)}
          aria-label={ariaLabel}
        >
          {items.map((item, index) => (
            <Tab
              key={index}
              sx={{
                color: 'grey.200',
                textTransform: 'none',
                '&[aria-selected="true"]': {
                  color: 'common.white',
                },
                '&:before': {
                  content: `''`,
                  position: 'absolute',
                  width: '0.625rem',
                  height: '0.625rem',
                  left: 0,
                  backgroundColor: item.update ? 'primary.main' : 'transparent',
                  borderRadius: '50%',
                },
                fontWeight: 700,
              }}
              label={item.label}
              {...a11yProps[0]}
            />
          ))}
        </Tabs>
      </Box>
      {items.map((item, index) => (
        <TabPanel value={currentTab} index={index} key={index}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default AppTabs;
