import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import styles from './index.module.scss';

type ReviewProgressProps = {
  label: string;
  valueBuffer: number;
  value: number;
  labelWidth?: string;
  percentWidth?: string;
}

const defaultProps = {
  labelWidth: '50px',
  percentWidth: '45px'
}

const ReviewProgress = (props: ReviewProgressProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <div className={styles.label} style={{width: props.labelWidth}}>{props.label}</div>
      <LinearProgress
        variant="determinate"
        value={props.value}
        valueBuffer={props.valueBuffer}
        classes={{
          root: styles['progress-root'],
          bar: styles['progress-bar']
        }}
      />
      <div className={styles.percent} style={{width: props.percentWidth}}>{(props.value/props.valueBuffer) * 100 }%</div>
    </Stack>
  )
}

ReviewProgress.defaultProps = defaultProps

export default ReviewProgress;