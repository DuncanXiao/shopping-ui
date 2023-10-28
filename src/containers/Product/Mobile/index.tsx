import { useRef } from 'react'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Price from '@/components/Price';
import ProductRating from '@/components/ProductRating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MobileDrawer from '@/components/MobileDrawer';
import { useTranslation } from 'next-i18next'
import Reviews from './components/Reviews'

import 'swiper/css';
import 'swiper/css/pagination';
type productProps = {
  productDetail: {
    [key: string]: any
  }
}

const ProductMobile = (props: productProps) => {
  const reviewDrawerRef = useRef<any>(null)
  const reviewContentRef = useRef<any>(null)
  const { t } = useTranslation('common')

  const handlerBtn = () => {
    reviewDrawerRef.current?.openDrawer()
    setTimeout(() => {
      reviewContentRef.current?.getProductReviews()
    }, 500)
  }

  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        navigation={true}
      >
        {
          props.productDetail.imgPaths.map((b: any, i: number) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  maxWidth: '1200px',
                  height: 200,
                }}
              >
                <Image
                  fill={true}
                  src={b}
                  alt={`banner${i}`}
                />
              </Box>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Price
            unit={props.productDetail.priceUnit}
            price={props.productDetail.price}
            discount={props.productDetail.discount}
          />
          <Button
            disableRipple
            sx={{paddingRight: 0, paddingLeft: 0}}
            onClick={handlerBtn}
          >
            <ProductRating
              rateValue={props.productDetail.rating}
              textProps={{color: '#faaf00', fontSize: '15px'}}
              showArrowIcon
            />
          </Button>
        </Box>
        <Typography
          variant='h1'
          sx={{fontSize: '16px', margin: '8px 0'}}
        >{props.productDetail.name}</Typography>
      </Container>

      <MobileDrawer
        drawerProps={{
          anchor: 'right',
          hideBackdrop: true,
          PaperProps: {sx: { width: '100%' }}
        }}
        headerName={t('components.ProductRating_headerName')}
        ref={reviewDrawerRef}
      >
        <Reviews
          ref={reviewContentRef}
          rateValue={props.productDetail.rating}
          starts={props.productDetail.starts}
          productId={props.productDetail.id}
        />
      </MobileDrawer>
    </div>
  )
}

ProductMobile.defaultValue = {
  productDetail: {}
}

export default ProductMobile