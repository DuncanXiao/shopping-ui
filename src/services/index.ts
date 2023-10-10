import axios from '@/utils/axios';

export const getCategory = () => {
  return Promise.resolve({
    data: [{
      id: '1',
      name: 'Category 11',
    },
    {
      id: '2',
      name: 'Category 2',
    },
    {
      id: '3',
      name: 'Category 3',
    },
    {
      id: '4',
      name: 'Category 4',
    }]
  })
}

export const getHomeData = () => {
  return Promise.resolve({
    data: {
      banners: [{
        id: 1,
        imgPath: '/static/images/messis.jpg',
      }, {
        id: 2,
        imgPath: '/static/images/messis2.jpg',
      }]
    }
  })
}

export const getProducts = (payload: any) => {
  return new Promise((resolve, reject) => {
    const arry = new Array(payload.pageSize)
    for (let i = 0; i < arry.length; i++) {
      const id = (payload.page - 1) * payload.pageSize + i
      arry[i] = {
        id,
        name: 'xxx'+ id,
        amount: 20,
        price: 20,
        priceUnit: '$',
        imgPath: payload.page % 2 ? '/static/images/messis.jpg' : '/static/images/messis2.jpg',
      }
    }
    setTimeout(() => {
      return resolve({
        data: arry,
        ...payload
      })
    }, 3000)
  })
}