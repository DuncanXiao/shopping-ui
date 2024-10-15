import Pagination from '@mui/material/Pagination';
import ReviewItem from '../ReviewItem';

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
          <ReviewItem
            key={item.id}
            userName={item.userName}
            avatarImg={item.avatarImg}
            rating={item.rating}
            variant={item.variant}
            updateTime={item.updateTime}
            content={item.content}
            imgPaths={item.imgPaths}
          />
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