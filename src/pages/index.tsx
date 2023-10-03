import { wrapper } from "@/store";
import Index from '@/containers/Index'
import { getHomeData, getProducts } from '@/services'
import ProductSlice from '@/store/productSlice'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      const res = await getHomeData()
      const products = await getProducts({
        pageSize: 30,
        page: 1,
        total: 100
      })
      store.dispatch(ProductSlice.actions.setProduct(products))
      return {
        props: {
          homeData: res.data
        },
      }
    }
);

type IndexPageProps = {
  homeData: {}
}

export default function IndexPage(props: IndexPageProps) {
  console.log('-IndexPage---', props)
  return (
    <Index data={props.homeData}/>
  )
}