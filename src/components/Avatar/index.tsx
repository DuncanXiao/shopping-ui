import { useContext } from 'react'
import CommonContext from '@/contexts/common'
import Avatar, { AvatarProps } from '@mui/material/Avatar';

type AvatarImageProps = {
  baseUrl?: string;
} & AvatarProps

const AvatarImage = (props: AvatarImageProps) => {
  const common = useContext(CommonContext)
  return (
    <Avatar
      {...props}
      src={`${props.baseUrl || common.staticNextHost}${props.src}`}
    />
  )
}

export default AvatarImage