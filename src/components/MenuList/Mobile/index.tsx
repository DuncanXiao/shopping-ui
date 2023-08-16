import { useEffect, useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import styles from './index.module.scss';

const menues = [{
  id: 1,
  name: 'T-shirt',
  href: '#',
  children: [{
    id: 1,
    name: 'Item 1.1',
    href: '#',
  }]
}]

type meneChildType = {
  id: number,
  name: string,
  href: string
}

type menuesType = {
  id: number,
  name: string,
  href: string,
  children?: [meneChildType]
}

type MobileMenuListProps = {
  id: number,
  isCurrennt: boolean
}

const MobileMenuList = (props: MobileMenuListProps) => {
  const [menuList, setMenuList] = useState<menuesType[]>([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState<any>({})

  useEffect(() => {
    if (props.isCurrennt && !menuList.length) {
      // call api
      setMenuList(menues as menuesType[])
    }
  }, [props.isCurrennt])

  const handleMenuItem = (menu: menuesType) => {
    if (menu?.children?.length) {
      setOpenDrawer(true)
      setSelectedMenu(menu)
    }
  }

  const closeDrawer = () => {
    setOpenDrawer(false)
  }

  return (
    <>
      <MenuList>
        {
          menuList.map((menu) => (
            <MenuItem key={menu.id} onClick={() => handleMenuItem(menu)}>
              <Stack
                sx={{width: '100%'}}
                direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="inherit" noWrap>
                  {menu.name}
                </Typography>
                {
                  menu.children && menu.children.length &&
                  <ArrowForwardIosIcon fontSize="small" />
                }
              </Stack>
            </MenuItem>
          ))
        }
      </MenuList>
      <Drawer
        anchor='left'
        open={openDrawer}
        hideBackdrop={true}
        classes={{ paper: styles['drawer-paper'] }}
      >
        <div className={styles['drawer-header']}>
          <ArrowBackIosNewIcon className={styles['back-btn']} onClick={closeDrawer} fontSize="medium" />
          <Typography variant="inherit" noWrap align='center'>
            {selectedMenu.name}
          </Typography>
        </div>
        <Divider />
        <MenuList>
          {
            selectedMenu.children && selectedMenu.children.map((menu: meneChildType) => (
              <MenuItem key={menu.id} onClick={() => handleMenuItem(menu)}>
                <Stack
                  sx={{width: '100%'}}
                  direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="inherit" noWrap>
                    {menu.name}
                  </Typography>
                </Stack>
              </MenuItem>
            ))
          }
        </MenuList>
      </Drawer>
    </>
  )
}

export default MobileMenuList