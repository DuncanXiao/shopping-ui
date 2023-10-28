import { wrapper } from "@/store";
import { getProductDetail } from '@/services'
import ProductMobile from '@/containers/Product/Mobile'
import ProductDesktop from '@/containers/Product/Desktop'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (options: any) => {
      const props = await serverSideTranslations(options.locale, ['common'])
      const productDetail = await getProductDetail({ ...options.params })
      return {
        props: {
          productDetail,
          ...props
        }
      }
    }
);

export default function Page(props: any) {
  return (
    <div>
      {
        props.common.isMobile ?
        <ProductMobile
          productDetail={props.productDetail}
        /> :
        <ProductDesktop
          productDetail={props.productDetail}
        />
      }
    </div>
  )
}