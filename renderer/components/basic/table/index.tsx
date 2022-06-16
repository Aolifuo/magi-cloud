/* eslint-disable no-unused-vars */
import React, { ReactElement } from 'react';
import styles from './index.module.css';

interface ITableProps<ObjTy> {
  records: ObjTy[];
  fieldMap: [number, string, string][];
  ratios: number[];
  hideTitle?: boolean;
  hasOrderId?: boolean;
  handleDoubleClick: (target: ObjTy[], index: number) => void;
}

interface HasId {
  id: number;
  [index: string]: string | number | undefined;
}

const Table
: <ObjTy extends HasId>(props: ITableProps<ObjTy>) => ReactElement<any, any> = (props) => {
  const {
    records,
    fieldMap,
    ratios,
    hideTitle,
    hasOrderId,
  } = props;
  const { handleDoubleClick } = props;
  const sumOfRatios = ratios.reduce((prev, cur) => (prev + cur), 0);
  const ratiosTransfer = ratios.map((v) => (v / sumOfRatios) * (hasOrderId ? 95 : 100));
  // console.log('render table');

  if ((records?.length ?? 0) === 0 || fieldMap.length !== ratios.length) {
    return <div />;
  }

  return (
    <div className={styles.table}>
      {
        (hideTitle ?? false)
          ? (
            <div>
              {
                hasOrderId
                  ? (
                    <div style={{ width: '5%' }} />
                  )
                  : null
              }
              {
                fieldMap
                  .map((v, i) => (
                    <div
                      key={v[0]}
                      style={{ width: `${ratiosTransfer[i]}%` }}
                    >
                      <span>{v[2]}</span>
                    </div>
                  ))
              }
            </div>
          )
          : null
      }
      {
        records
          .map((record, index) => (
            <div
              key={record.id}
              onDoubleClick={() => handleDoubleClick(records, index)}
            >
              {
                hasOrderId
                  ? (
                    <div style={{ width: '5%' }}>
                      <span>{index < 10 ? `0${index}` : index}</span>
                    </div>
                  )
                  : null
              }
              {
                fieldMap
                  .map((v, i) => (
                    <div
                      key={v[0]}
                      style={{ width: `${ratiosTransfer[i]}%` }}
                    >
                      <span>
                        {
                          record[v[1]] !== undefined
                            ? record[v[1]]
                            : ''
                        }
                      </span>
                    </div>
                  ))
              }
            </div>
          ))
      }
    </div>
  );
};

function createTable <ObjTy extends HasId>()
: (props: ITableProps<ObjTy>) => ReactElement<any, any> {
  return Table;
}

export default Table;
export { createTable };
export type { ITableProps };
