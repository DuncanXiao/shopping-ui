import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as services from '@/services'
import ReviewProgress from '@/components/ReviewProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next'
import ProductRating from '@/components/ProductRating';
import ReviewList from '../../../components/ReviewList';

import styles from './index.module.scss';

type ReviewsProps = {
  rateValue: number;
  productId: number;
  starts: [any];
}

const Reviews = forwardRef((props: ReviewsProps, ref:any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [reviewsList, setReviewsList] = useState<{[key: string]: any}>({
    data: [],
    total: 0
  })
  const { t } = useTranslation('common')

  const handlePagination = () => {

  }

  useImperativeHandle(ref, () => {
    return {
      getProductReviews: async() => {
        console.log('s--s--s-s-s')
        setIsLoading(true)
        const res = await services.getProductReviews({
          id: props.productId,
          page: 1,
          pageSize: 10,
          total: 20,
        })
        if (res) {
          setReviewsList(res)
        }
        setIsLoading(false)
      }
    }
  }, [])

  return (
    <>
      <Container>
        <Box
          sx={{
            background: '#f6f6f6',
            borderRadius: '20px',
            paddingBottom: '15px'
          }}
        >
          <ProductRating
            boxSxProps={{
              alignItems: 'center',
              padding: '10px 15px'
            }}
            textProps={{
              fontSize: '26px',
              fontWeight: 'bold'
            }}
            ratingProps={{
              size: "large"
            }}
            rateValue={props.rateValue}
          />
          <Stack sx={{width: '100%', padding: '0 15px'}} spacing={1}>
            {
              props.starts && props.starts.map((s:any, i:number) => (
                <ReviewProgress
                  key={i}
                  value={s.value}
                  valueBuffer={100}
                  label={s.name}
                />
              ))
            }
          </Stack>
        </Box>
      </Container>
      <Container>
        {
          isLoading ? (
            <Box
              sx={{
                textAlign: 'center',
                marginTop: '10px'
              }}
            >
              <CircularProgress />
            </Box>
          ) :
          reviewsList.data &&
            <ReviewList
              showPagination
              list={reviewsList.data}
              total={reviewsList.total}
              handlePagination={handlePagination}
            />
        }
      </Container>
    </>
  )
})

export default Reviews;
