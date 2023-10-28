import { useImperativeHandle, useState, forwardRef, ForwardRefRenderFunction } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import styles from './index.module.scss';

const defaultProps = {
  isShowHeader: true
}

type MobileDrawerProps = {
  drawerProps: Omit<DrawerProps, 'open'>;
  children?: React.ReactNode;
  isShowHeader?: boolean;
  headerName?: string;
};

export type refHandle = {
  openDrawer: () => void;
}

const MobileDrawer = forwardRef<HTMLAllCollection, MobileDrawerProps>((prop: MobileDrawerProps, ref: any) => {
  const [isOpen, setIsOpen] = useState(false)
  useImperativeHandle(ref, () => {
    return {
      openDrawer: () => {
        setIsOpen(true)
      }
    }
  }, [])

  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      {...prop.drawerProps}
    >
      {
        prop.isShowHeader &&
        <>
          <div className={styles['drawer-header']}>
            <IconButton classes={{ root: styles['back-btn']}} onClick={() => setIsOpen(false)}>
              <ArrowBackIosNewIcon fontSize="medium" />
            </IconButton>
            <Typography
              variant="inherit"
              noWrap
              align='center'
              sx={{fontSize: '16px'}}
            >
              {prop.headerName}
            </Typography>
          </div>
          <Divider />
        </>
      }
      { prop.children }
    </Drawer>
  )
})

MobileDrawer.defaultProps = defaultProps

export default MobileDrawer