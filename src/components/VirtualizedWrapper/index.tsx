import { useRef, useState, useEffect, useMemo } from 'react';
import {InfiniteLoader, List, ListRowRenderer, IndexRange, ListProps, AutoSizer, CellMeasurerCache, CellMeasurer, ListRowProps} from 'react-virtualized';
import usePreviousValue from '@/utils/hooks/usePreviousValue'
import 'react-virtualized/styles.css';

type VirtualizedWrapperProps = {
  isRowLoaded: ({ index }: { index: number }) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<any>;
  rowRenderer:  (props: {
    index: number,
    key: string
  }) => React.ReactNode;
  remoteRowCount: number;
  threshold?: number;
  listHeight: number;
  listRowHeight: number;
  listProps?: Omit<ListProps, 'onRowsRendered' | 'rowRenderer' | 'rowCount' | 'ref'>
  list: any[]
}


const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 100
});

const VirtualizedWrapper = (props: VirtualizedWrapperProps) => {
  const listRef = useRef<any>(null)

  const _rowRenderer = (options: ListRowProps) => {
    const {index, key, parent, style} = options
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {({registerChild}) => (
          <div style={style} ref={registerChild}>
            {props.rowRenderer({index, key})}
          </div>
        )}
      </CellMeasurer>
    )
  }

  return (
    <InfiniteLoader
      isRowLoaded={props.isRowLoaded}
      loadMoreRows={props.loadMoreRows}
      rowCount={props.remoteRowCount}
      threshold={props.threshold}
      minimumBatchSize={10}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer
          disableHeight
        >
          {({width}) => (
            <div ref={registerChild}>
              <List
                ref={listRef}
                width={width}
                height={props.listHeight}
                deferredMeasurementCache={cache}
                onRowsRendered={onRowsRendered}
                rowCount={props.remoteRowCount}
                rowHeight={cache.rowHeight}
                overscanRowCount={3}
                rowRenderer={_rowRenderer}
                {...props.listProps}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  )
}

export default VirtualizedWrapper
