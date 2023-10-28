import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from '@/components/Image';
import Avatar from '@/components/Avatar';
import Typography from '@mui/material/Typography';
import ProductRating from '@/components/ProductRating';
import styles from './index.module.scss'

type ReviewItemProps = {
  avatarImg: string;
  userName: string;
  rating: number;
  variant: any[];
  updateTime: string;
  content: string;
  imgPaths: string[];
}
const ReviewItem = (props: ReviewItemProps) => {
  return (
    <Box
      sx={{marginBottom: '20px'}}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing="10px"
          sx={{width: '60%'}}
        >
          <Avatar src={props.avatarImg} />
          <Typography component="span" noWrap classes={{ root: styles['user-name']}}>{props.userName}</Typography>
        </Stack>
        <ProductRating
          rateValue={props.rating}
          textProps={{color: '#faaf00', fontSize: '15px'}}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={'space-between'}
      >
        <Typography component="span" classes={{ root: styles.variant }}>{
          props.variant.map((v: any, i:number) => v.style + '/' + v.value + (i === props.variant.length - 1 ? '' : ', '))
        }</Typography>
        <Typography component="span">{props.updateTime}</Typography>
      </Stack>
      <Typography gutterBottom>{props.content}</Typography>
      <Stack direction="row" flexWrap="wrap" sx={{gap: '10px'}}>
        {
          props.imgPaths.map((v:any, i:number) => (
            <div key={i}  style={{width: '150px', height: '150px'}}>
              <Image src={v} key={i} alt={v} fill style={{objectFit: "cover"}}/>
            </div>
          ))
        }
      </Stack>
    </Box>
  )
}

export default ReviewItem