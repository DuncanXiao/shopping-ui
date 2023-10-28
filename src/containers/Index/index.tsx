import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Image from 'next/image'
import CommonContext from '@/contexts/common'
import ProductList from './components/ProductList';
import 'swiper/css';
import 'swiper/css/pagination';

type IndexProps = {
  data: {
    [property : string]: any
  }
}

const Index = (props: IndexProps) => {

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        navigation={true}
      >
        {
          props.data.banners.map((b: any) => (
            <SwiperSlide key={b.id}>
              <Box
                sx={{
                  maxWidth: '1200px',
                  height: 200,
                }}
              >
                <Image
                  fill={true}
                  src={b.imgPath}
                  alt={`banner${b.id}`}
                />
              </Box>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <ProductList />
    </>
  )
}

export default Index