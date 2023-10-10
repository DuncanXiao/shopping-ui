import { useRef, useEffect } from 'react';
import {InfiniteLoader, Grid, GridCellProps, IndexRange, WindowScroller, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';

type VirtualizedGridWrapperProps = {
  isRowLoaded: ({ index }: { index: number }) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<any>;
  rowCount: number;
  columnWidth: number;
  rowHeight: number;
  cellRenderer: (params: { index: number; style: React.CSSProperties; key: any }) => any;
  columnCount: number;
}

const VirtualizedGridWrapper = (props: VirtualizedGridWrapperProps) => {
  const windowRef = useRef(null)
  const showRowCount = Math.ceil(props.rowCount / props.columnCount)
  return (
    <InfiniteLoader
      isRowLoaded={props.isRowLoaded}
      loadMoreRows={props.loadMoreRows}
      rowCount={showRowCount}
      minimumBatchSize={1}
      threshold={1}
    >
      {({ onRowsRendered, registerChild }) => {
            return (
              <WindowScroller serverHeight={1000}>
                {({ height, scrollTop }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => {
                        // console.log('WindowScroller: ', height, scrollTop)
                        return(<Grid
                          autoHeight
                          ref={registerChild}
                          width={width}
                          height={height}
                          scrollTop={scrollTop}
                          columnWidth={props.columnWidth}
                          columnCount={props.columnCount}
                          rowCount={showRowCount}
                          rowHeight={props.rowHeight}
                          cellRenderer={({
                            columnIndex,
                            key,
                            rowIndex,
                            style
                          }) => {
                            return props.cellRenderer({
                              index: props.columnCount * rowIndex + columnIndex,
                              style,
                              key
                            })
                          }}
                          onSectionRendered={({ rowStartIndex, rowStopIndex }) => onRowsRendered({
                            startIndex: rowStartIndex,
                            stopIndex: rowStopIndex
                          })}
                        />)
                    }}
                  </AutoSizer>
                )}
              </WindowScroller>
            );
          }}
    </InfiniteLoader>
  )
}

export default VirtualizedGridWrapper
