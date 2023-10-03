import { useContext } from 'react'
import NextImage, { ImageProps } from 'next/image'
import CommonContext from '@/contexts/common'

export type DImageProps = {
  baseUrl?: string
} & ImageProps

const Image = (props: DImageProps) => {
  const common = useContext(CommonContext)
  return (
    <NextImage
      {...props}
      src={`${props.baseUrl || common.staticNextHost}${props.src}`}
    />
  )
}

export default Image