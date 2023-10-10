import { useContext, ReactNode } from 'react'
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia, {CardMediaProps} from '@mui/material/CardMedia';
import { CardActionArea, CardActions, CardActionAreaProps } from '@mui/material';
import Image, { DImageProps } from '@/components/Image';
import CommonContext from '@/contexts/common'

type MultiActionAreaCardProps = {
  cardProps?: CardProps;
  mediaPath: string;
  children: ReactNode;
  bottomRender?: ReactNode;
  cardAreaProps?: CardActionAreaProps;
} & ({
  mediaProps: Omit<DImageProps, 'src'>
  mediaType: 'img';
} | {
  baseUrl?: string;
  mediaType: 'video' | 'audio' | 'picture' | 'iframe';
  mediaProps: CardMediaProps;
})

export default function MultiActionAreaCard(props: MultiActionAreaCardProps) {
  const common = useContext(CommonContext)

  return (
    <Card 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...props.cardProps}
    >
      <CardActionArea
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'inherit',
          height: '100%'
        }}
        {...props.cardAreaProps}
      >
        {
          props.mediaType === 'img' ? (
            <Image
              { ...props.mediaProps }
              src={props.mediaPath}
            />
          ) : (
            <CardMedia
              {...props.mediaProps}
              src={`${props.baseUrl || common.staticNextHost}${props.mediaProps.src}`}
            />
          )
        }
        <CardContent>
          {props.children}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {props.bottomRender}
      </CardActions>
    </Card>
  );
}