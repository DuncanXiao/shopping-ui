import React, { ReactNode, useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Image from 'next/image'
import CommonContext from '@/contexts/common'
import DehazeIcon from '@mui/icons-material/Dehaze';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import Navigation from '@/components/Navigation/Mobile';
import styles from './index.module.scss'

const MobileHeader = () => {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false)
  const common = useContext(CommonContext)
  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpenLeftDrawer(!openLeftDrawer)
  }
  return (
    <>
      <Box
        className={styles['header-box']}
      >
        <IconButton onClick={toggleDrawer}>
          <DehazeIcon
            className={styles['base-icon']}
          />
        </IconButton>
        <Image
          className={styles['logo']}
          src={`${common.staticNextHost}/static/images/logo2.svg`}
          width={250}
          height={47.8}
          alt='logo'
        />
        <div className={styles['right-content']}>
          <IconButton>
            <SearchIcon
              className={styles['base-icon']}
            />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon
              className={styles['base-icon']}
            />
          </IconButton>
        </div>
      </Box>
      <Drawer
        anchor={'left'}
        open={openLeftDrawer}
        onClose={toggleDrawer}
        classes={{ paper: styles['drawer-paper'] }}
      >
        <div>
          <Navigation />
        </div>
      </Drawer>
    </>
  )
}

export default MobileHeader