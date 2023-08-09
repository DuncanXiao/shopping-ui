import { useState } from 'react'
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import MobileMenuList from '@/components/MenuList/Mobile';
import styles from './index.module.scss';

const categories = [
  {
    id: '1',
    name: 'Category 1',
  },
  {
    id: '2',
    name: 'Category 2',
  },
  {
    id: '3',
    name: 'Category 3',
  },
  {
    id: '4',
    name: 'Category 4',
  }
]

const Navigation = () => {
  const [value, setValue] = useState(categories[0].id);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
     <TabContext value={value}>
      <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          {
            categories.map(c => (
              <Tab key={c.id} label={c.name} value={c.id} />
            ))
          }
      </Tabs>
      {
        categories.map(c => (
          <TabPanel classes={{
            root: styles['tab-panel']
          }} key={c.id} value={c.id}>
            <MobileMenuList id={c.id} isCurrennt={value === c.id} />
          </TabPanel>
        ))
      }
     </TabContext>
    </>
  )
}

export default Navigation