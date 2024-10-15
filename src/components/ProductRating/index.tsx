import Rating, {RatingProps} from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography, {TypographyProps} from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './index.module.scss';

type ProductRatingProps = {
  rateValue: number;
  boxSxProps?: {
    [key:string]: any
  };
  ratingProps?: RatingProps;
  showArrowIcon?: boolean;
  textProps?:TypographyProps;
}

const defaultProps = {
  boxSxProps: {},
  showArrowIcon: false
}

const ProductRating = (props: ProductRatingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        ...props.boxSxProps
      }}
    >
      <Typography {...props.textProps}>{props.rateValue}</Typography>
      <Rating
        name="read-only"
        value={Math.floor(props.rateValue * 100) / 100}
        readOnly
        precision={0.1}
        {...props.ratingProps}
      />
      {props.showArrowIcon && <ArrowForwardIosIcon color="disabled"/>}
    </Box>
  )
}

ProductRating.defaultProps = defaultProps

export default ProductRating;
