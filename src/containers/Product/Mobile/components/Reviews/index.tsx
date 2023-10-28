import { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as services from '@/services'
import ReviewProgress from '@/components/ReviewProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next'
import ProductRating from '@/components/ProductRating';
import VirtualizedWrapper from '@/components/VirtualizedWrapper';
import omit from 'lodash/omit';
import ReviewItem from '../../../components/ReviewItem';

import styles from './index.module.scss';

type ReviewsProps = {
  rateValue: number;
  productId: number;
  starts: [any];
}

const Reviews = forwardRef((props: ReviewsProps, ref:any) => {
  const [isLoading, setIsLoading] = useState(false)
  const [reviewsList, setReviewsList] = useState<any[]>([])
  const [paginationData, setPaginationData] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  })
  const { t } = useTranslation('common')

  const getProductReviews = async(options: {
    id: number;
    page: number;
    pageSize: number;
    total: number;
  }) => {
    setIsLoading(true)
    const res: any = await services.getProductReviews(options)
    if (res) {
      const pagination = omit(res, 'data')
      console.log('---res.data', res)
      setReviewsList(res.data)
      setPaginationData({
        page: pagination.page,
        pageSize: pagination.pageSize,
        total: pagination.total
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getProductReviews({
      id: props.productId,
      page: 1,
      pageSize: 10,
      total: 20,
    })
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
          reviewsList.length &&
            <VirtualizedWrapper
              list={reviewsList}
              listRowHeight={100}
              listHeight={500}
              threshold={10}
              listProps={{
                overscanRowCount: 10
              }}
              loadMoreRows={({startIndex, stopIndex}) => {
                console.log('startIndex, stopIndex', startIndex, stopIndex)
                return new Promise(resolve => {
                  resolve([])
                });
              }}
              isRowLoaded={({index}) => {
                console.log('111111', index, !!reviewsList[index])
                return !!reviewsList[index]
              }}
              remoteRowCount={paginationData.total}
              rowRenderer={({ index, key }) => {
                console.log(reviewsList, index, '-2222--')
                return reviewsList[index] ?
                      <ReviewItem
                        avatarImg={reviewsList[index].avatarImg}
                        userName={reviewsList[index].userName}
                        rating={reviewsList[index].rating}
                        variant={reviewsList[index].variant}
                        updateTime={reviewsList[index].updateTime}
                        content={reviewsList[index].content}
                        imgPaths={reviewsList[index].imgPaths}
                      />
                    : null
                  }
              }
            />
        }
      </Container>
    </>
  )
})

export default Reviews;
