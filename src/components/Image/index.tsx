import { useContext } from 'react'
import NextImage, { ImageProps } from 'next/image'
import CommonContext from '@/contexts/common'
import styles from './index.module.scss'

export type DImageProps = {
  baseUrl?: string
} & ImageProps

const Image = (props: DImageProps) => {
  const common = useContext(CommonContext)
  return (
    props.fill ? (
      <div className={styles.image}>
        <NextImage
          style={{objectFit: "contain"}}
          {...props}
          src={`${props.baseUrl || common.staticNextHost}${props.src}`}
        />
      </div>
    ) : (
      <NextImage
        {...props}
        src={`${props.baseUrl || common.staticNextHost}${props.src}`}
      />
    )
  )
}

export default Image