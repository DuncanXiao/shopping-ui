import { useRef, useState } from 'react';
import {Collection, AutoSizer, WindowScroller, CollectionCellRenderer } from 'react-virtualized';
import throttle from 'lodash/throttle'
import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.scss'

type VirtualizedCollectionWrapperProps = {
  onScrollBottom?: () => Promise<any>;
  cellRenderer: CollectionCellRenderer;
  cellCount: number;
  cellHeight: number;
  cellWidth: number;
  offsetBottom: number;
  isContentCenter?: boolean;
} & ({
  isFill: true;
  columns: number;
} | {
  isFill: false | undefined;
  columns: undefined;
})
const defaultProps = {
  isContentCenter: true,
  isFill: true
};

const VirtualizedCollectionWrapper = (props: VirtualizedCollectionWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [columns, setColumns] = useState(props.columns || 1)
  const [cellWidth, setCellWidth] = useState(props.cellWidth)
  const [cellHeight, setCellHeight] = useState(props.cellHeight)
  const [isPointCall, setIsPointCall] = useState(true)
  const collectContainerRef = useRef<HTMLDivElement>(null)
  const collectRef = useRef<any>(null)

  return (
    <WindowScroller
      onScroll={throttle(({ scrollTop, scrollLeft }) => {
        if (isLoading || !props.onScrollBottom) return;

        const wh = window.outerHeight
        if (collectContainerRef.current && (wh - props.offsetBottom + scrollTop) > collectContainerRef.current.clientHeight) {
          if (isPointCall) {
            setIsLoading(true)
            setIsPointCall(false)
            props.onScrollBottom().finally(() => {
              setIsLoading(false)
            })
          }
        } else {
          setIsPointCall(true)
        }
      }, 1000)}
    >
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
        <div style={{flex: '1 1 auto'}} ref={collectContainerRef}>
          <AutoSizer
            disableHeight
            onResize={({ width }) => {
              if (!props.isFill) {
                setColumns(Math.floor(width / props.cellWidth))
              } else {
                const percent = props.cellWidth / props.cellHeight
                const w = Math.floor(width / columns)
                const h = Math.floor(w / percent)
                setCellWidth(w)
                setCellHeight(h)
              }
              if (collectRef?.current?._collectionView) {
                collectRef?.current?._collectionView.recomputeCellSizesAndPositions()
              }
            }}
          >
            {
              ({width}) => (
                <div ref={registerChild as any}>
                  <Collection
                    className={props.isContentCenter ? styles.center : ''}
                    ref={collectRef}
                    width={width}
                    height={height}
                    autoHeight
                    cellRenderer={props.cellRenderer}
                    cellCount={props.cellCount}
                    cellSizeAndPositionGetter={({index}) => {
                      return {
                        height: cellHeight,
                        width: cellWidth,
                        y: Math.floor(index / columns) * cellHeight,
                        x: (index % columns) * cellWidth
                      }
                    }}
                    onScroll={onChildScroll}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                  />
                </div>
              )
            }
          </AutoSizer>
          {isLoading && <div className={styles.loading}><CircularProgress /></div>}
        </div>
      )}
    </WindowScroller>
  )
}

VirtualizedCollectionWrapper.defaultProps = defaultProps

export default VirtualizedCollectionWrapper
