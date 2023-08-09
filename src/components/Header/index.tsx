import React, { ReactNode, useContext, useState } from 'react'
import CommonContext from '@/contexts/common'
import MobileHeader from './components/Mobile/index';
import DesktopHeader from './components/Desktop/index';


import styles from './index.module.scss'

type Props = {
  children?: ReactNode
  title?: string
}

const Header = ({ children, title = 'This is the default title' }: Props) => {
  const common = useContext(CommonContext)

  return (
    <header>
      {
        common.isMobile ? <MobileHeader /> : <DesktopHeader />
      }
    </header>
  )
}

export default Header