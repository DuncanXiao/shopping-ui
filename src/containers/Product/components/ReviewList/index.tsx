import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from '@/components/Image';
import Avatar from '@/components/Avatar';
import Typography from '@mui/material/Typography';
import ProductRating from '@/components/ProductRating';
import styles from './index.module.scss'

type ReviewListProps = {
  list: [{[key: string]: any}];
  showPagination?: boolean;
} & {
  showPagination: true,
  handlePagination: (e: React.ChangeEvent<unknown>, page: number) => void;
  total: number;
}

const ReviewList = (props: ReviewListProps) => {
  return (
    <>
      {
        props.list.map((item: {[key: string]: any}) => (
          <Box
            key={item.id}
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
                <Avatar src={item.avatarImg} />
                <Typography component="span" noWrap classes={{ root: styles['user-name']}}>{item.userName}</Typography>
              </Stack>
              <ProductRating
                rateValue={item.rating}
                textProps={{color: '#faaf00', fontSize: '15px'}}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={'space-between'}
            >
              <Typography component="span" classes={{ root: styles.variant }}>{
                item.variant.map((v: any, i:number) => v.style + '/' + v.value + (i === item.variant.length - 1 ? '' : ', '))
              }</Typography>
              <Typography component="span">{item.updateTime}</Typography>
            </Stack>
            <Typography gutterBottom>{item.content}</Typography>
            <Stack direction="row" flexWrap="wrap" sx={{gap: '10px'}}>
              {
                item.imgPaths.map((v:any, i:number) => (
                  <div key={i}  style={{width: '150px', height: '150px'}}>
                    <Image src={v} key={i} alt={v} fill style={{objectFit: "cover"}}/>
                  </div>
                ))
              }
            </Stack>
          </Box>
        ))
      }
      {
        props.showPagination && !!props.total &&
          <Pagination
            count={props.total}
            color="secondary"
            onChange={(e: React.ChangeEvent<unknown>, page: number) => {
              props.handlePagination(e, page)
            }}
          />
      }
    </>
  )
}

export default ReviewList