import { useState } from 'react'
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import MobileMenuList from '@/components/MenuList/Mobile';
import type {CategoriesType} from '@/store/navigateSlice'
import styles from './index.module.scss';

const Navigation = () => {
  const [value, setValue] = useState('0');
  const categories: CategoriesType[] = useSelector((state: any) => state.navigate.navigator);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={styles['navigation']}>
     <TabContext value={value}>
      <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          {
            categories.map((c, index: number) => (
              <Tab key={c.id} label={c.name} value={`${index}`} />
            ))
          }
      </Tabs>
      {
        categories.map((c, index: number) => (
          <TabPanel classes={{
            root: styles['tab-panel']
          }} key={c.id}  value={`${index}`}>
            <MobileMenuList id={c.id} isCurrennt={value === `${index}`} />
          </TabPanel>
        ))
      }
     </TabContext>
    </div>
  )
}

export default Navigation