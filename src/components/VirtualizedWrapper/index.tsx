import {InfiniteLoader, List, ListRowRenderer, IndexRange, ListProps} from 'react-virtualized';
import 'react-virtualized/styles.css';

type VirtualizedWrapperProps = {
  isRowLoaded: ({ index }: { index: number }) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<any>;
  rowRenderer: ListRowRenderer;
  remoteRowCount: number;
  listWidth: number;
  listHeight: number;
  listRowHeight: number;
  listProps?: Omit<ListProps, 'onRowsRendered' | 'rowRenderer' | 'rowCount' | 'ref'>
}

const VirtualizedWrapper = (props: VirtualizedWrapperProps) => {
  return (
    <InfiniteLoader
      isRowLoaded={props.isRowLoaded}
      loadMoreRows={props.loadMoreRows}
      rowCount={props.remoteRowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          width={props.listWidth}
          height={props.listHeight}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
          rowCount={props.remoteRowCount}
          rowHeight={props.listRowHeight}
          rowRenderer={props.rowRenderer}
          {...props.listProps}
        />
      )}
    </InfiniteLoader>
  )
}

export default VirtualizedWrapper
