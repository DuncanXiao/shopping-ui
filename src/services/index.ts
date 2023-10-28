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

export const getProductDetail = (payload: any) => {
  return new Promise((resolve, reject) => {
    return resolve({
      id: 1,
      name: payload.title,
      amount: 20,
      price: 20,
      priceUnit: '$',
      remainKey: 'Size',
      imgPaths:['/static/images/messis.jpg', '/static/images/messis2.jpg'],
      discount: 0.25,
      rating: 3.1,
      reviews: 100,
      starts:[
        {
          name: 'start5',
          value: 5,
        },
        {
          name: 'start4',
          value: 5,
        },
        {
          name: 'start3',
          value: 5,
        },
        {
          name: 'start2',
          value: 5,
        },
        {
          name: 'start1',
          value: 5,
        }
      ],
      variant: [{
        style: 'color',
        value: [{
          name: 'red',
          remain: 1
        }]
      }, {
        style: 'Size',
        value: [{
          name: 'XL',
          remain: 1
        },{
          name: 'L',
          remain: 1
        }]
      }]
    })
  })
}

export const getProductReviews = (payload: any) => {
  return new Promise((resolve, reject) => {
    const arry = new Array(payload.pageSize)
    for (let i = 0; i < arry.length; i++) {
      const id = (payload.page - 1) * payload.pageSize + i
      arry[i] = {
        id,
        userName: 'xxx hello hello hello hello2223 hello hello 123'+ id,
        updateTime: '2023-10'+'-'+id,
        quality: 5,
        shipping: 5,
        service: 5,
        rating: 5,
        content: 'lalal this the dddxx',
        variant:[{style: 'color', value: 'red'}, {style: 'Size', value: 'XL'}],
        avatarImg: payload.page % 2 ? '/static/images/messis.jpg' : '/static/images/messis2.jpg',
        imgPaths:['/static/images/messis.jpg', '/static/images/messis2.jpg', '/static/images/messis2.jpg']
      }
    }
    setTimeout(() => {
      resolve({
        data: arry,
        ...payload
      })
    }, 3000)
  })
}