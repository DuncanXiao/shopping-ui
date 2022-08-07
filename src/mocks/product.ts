import { faker } from '@faker-js/faker';

const buildProductDetail = (options: any) => {
  return {
    id: faker.random.numeric(5),
    slug: 'sex-product', // faker.lorem.slug()
    header: {
      title: 'header test'
    },
    usAmount: faker.finance.amount(),
    discount: '20%',
    variations: [0,1].map((v) => (
      [
        {
          size: ['xs', 'xl'][v],
          color: '',
          style: '',
          usAmount: faker.finance.amount()
        }
      ]
    )),
    description: faker.commerce.productDescription(),
    images: Array(12).map((_v, index) => ({isCover: index === 0, url: faker.image.image()})),
    videoUrl: '',
    title: 'test title',
    category: '',
    ...options
  }
}

export default {
  buildProductDetail
}