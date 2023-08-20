import { wrapper, useAppDispatch } from "@/store";
import Index from '@/containers/Index'
import { getHomeData } from '@/services'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async () => {
      const res = await getHomeData()
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