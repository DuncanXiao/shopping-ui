import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import productGeneral from '@/mocks/product'
import Layout from '@/components/Layout'

type IProps = {
  id: number;
  slug: string;
  header: {
    title: string;
  }
  usAmount: number;
  discount: string;
  variations: {
    size: string;
    color: string;
    style: string;
    usAmount: number;
  }[];
  description: string;
  images: {
    isCover: Boolean;

    color: string;
    style: string;
    usAmount: number;
  }[];
  videoUrl: string;
  title: string;
  category: string;
}
function ProductDetail({
  data
}: {
  data: IProps
}) {
  return (
    <Layout
      title={data.header.title}
    >
      <main>
        <div className="text-3xl font-bold underline">
          hello word productdetail
          {data.header.title}
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data: IProps = productGeneral.buildProductDetail({})

  // // Pass data to the page via props
  return { props: { data } }
}

export default ProductDetail
