import { useEffect, useState } from 'react';
import useLegacyEffect from '@/utils/hooks/useLegacyEffect';
import VirtualizedCollectionWrapper from '@/components/VirtualizedCollectionWrapper';
import { useAppDispatch, useSelector } from "@/store";
import { selectProducts, getProducts } from "@/store/productSlice";
import MultiActionAreaCard from '@/components/MultiActionAreaCard';
import 'react-virtualized/styles.css';

import styles from './index.module.scss';

type ProductInfo = {
  imgPath: string;
  id: number;
  name: string;
  amount: number;
  price: number;
  priceUnit: string;
}

const cellWidth = 187.5;
const cellHeight = 265.5;
const ProductList = () => {
  const products = useSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [productList, setProductList] = useState<ProductInfo[]>([]);

  useLegacyEffect(() => {
    if (products?.data.length > 0) {
      setProductList((p) => p.concat(products.data));
    }
  }, [products])
  return (
    <div className={styles['product-list']}>
      { productList.length && <VirtualizedCollectionWrapper
        onScrollBottom={() => {
          if (products.page > products.total / products.pageSize) {
            return Promise.reject()
          }
          return dispatch(getProducts({
            pageSize: 30,
            page: products.page + 1,
            total: 100
          }))
        }}
        cellRenderer={({ index, key, style }) => {
          return (
            <div key={key} style={style} className={styles['product-item']}>
              <MultiActionAreaCard
                mediaType="img"
                mediaPath={productList[index].imgPath}
                mediaProps={{
                  alt: productList[index].name,
                  fill: true
                }}
              >
                <div>
                  {productList[index].name}
                </div>
                <div>
                  {productList[index].price}
                  { Number(productList[index].amount) <= 5 ? <span>Only {productList[index].amount} left</span> : '' }
                </div>
              </MultiActionAreaCard>
            </div>
          )
        }}
        columns={2}
        cellCount={productList.length}
        cellHeight={cellHeight}
        cellWidth={cellWidth}
        offsetBottom={0}
      />
      }
    </div>
  )
}

export default ProductList