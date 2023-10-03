import { ReactElement, useRef, useState } from 'react';
import {Collection, AutoSizer, WindowScroller, CollectionCellRenderer } from 'react-virtualized';
import throttle from 'lodash/throttle'

type VirtualizedCollectionWrapperProps = {
  onScrollBottom: () => Promise<any>;
  cellRenderer: CollectionCellRenderer;
  cellCount: number;
  cellHeight: number;
  cellWidth: number;
  offsetBottom: number;
}

const VirtualizedCollectionWrapper = (props: VirtualizedCollectionWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [columns, setColumns] = useState(1)
  const collectContainerRef = useRef<HTMLDivElement>(null)
  const collectRef = useRef<any>(null)
  return (
    <WindowScroller
      onScroll={throttle(({ scrollTop, scrollLeft }) => {
        if (isLoading) return;

        const wh = window.outerHeight
        if (collectContainerRef.current && (wh - props.offsetBottom + scrollTop) > collectContainerRef.current.clientHeight) {
          setIsLoading(true)
          props.onScrollBottom().finally(() => {
            setIsLoading(false)
          })
        }
      }, 1000)}
    >
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
        <div style={{flex: '1 1 auto'}} ref={collectContainerRef}>
          <AutoSizer
            disableHeight
            onResize={({ width }) => {
              if (collectRef?.current?._collectionView) {
                collectRef?.current?._collectionView.recomputeCellSizesAndPositions()
              }
              setColumns(Math.floor(width / props.cellWidth) || 1)
            }}
          >
            {
              ({width}) => (
                <div ref={registerChild as any}>
                  <Collection
                    ref={collectRef}
                    width={width}
                    height={height}
                    autoHeight
                    cellRenderer={props.cellRenderer}
                    cellCount={props.cellCount}
                    cellSizeAndPositionGetter={({index}) => {
                      return {
                        height: props.cellHeight,
                        width: props.cellWidth,
                        y: Math.floor(index / columns) * props.cellHeight,
                        x: (index % columns) * props.cellWidth
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
          {isLoading && <div>Loading</div>}
        </div>
      )}
    </WindowScroller>
  )
}

export default VirtualizedCollectionWrapper
