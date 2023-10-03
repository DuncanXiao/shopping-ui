import { useEffect, useState } from 'react';
import useLegacyEffect from '@/utils/hooks/useLegacyEffect';
// import VirtualizedWrapper from '@/components/VirtualizedWrapper';
import VirtualizedCollectionWrapper from '@/components/VirtualizedCollectionWrapper';
import { useAppDispatch, useSelector } from "@/store";
import { selectProducts, getProducts } from "@/store/productSlice";
import MultiActionAreaCard from '@/components/MultiActionAreaCard';
import {Collection, AutoSizer, WindowScroller} from 'react-virtualized';
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

const cellWidth = 200;
const cellHeight = 50;
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
            <div key={key} style={style} className="row">
              {productList[index].id} <br />
              {productList[index].name}
            </div>
          )
        }}
        cellCount={productList.length}
        cellHeight={cellHeight}
        cellWidth={cellWidth}
        offsetBottom={30}
      />
}
    </div>
  )
}

export default ProductList