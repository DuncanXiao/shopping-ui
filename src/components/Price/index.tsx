import styles from './index.module.scss';

type PriceProps = {
  price: number;
  unit: string;
  discount: number | undefined | null;
}

const Price = (props: PriceProps) => {
  return (
    <div className={styles['price-box']}>
      {
        props.discount && props.discount < 1 ? (
          <>
            <span className={styles['discount-price']}>{props.unit}{(1 - Number(props.discount)) * props.price}</span>
            <span className={styles['remove-price']}>{props.unit}{props.price}</span>
          </>
        ) : (
          <span className={styles['original-price']}>{props.unit}{props.price}</span>
        )
      }
    </div>
  )
}

export default Price