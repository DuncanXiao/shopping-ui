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
        imgUrl: '/static/images/messis.jpg',
      }, {
        id: 2,
        imgUrl: '/static/images/messis2.jpg',
      }]
    }
  })
}