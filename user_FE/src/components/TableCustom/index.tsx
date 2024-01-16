import { Table } from 'antd';
import React from 'react';

interface TableCustom {
  dataSource: any;
  columns: any;
}

function TableCustom(props: TableCustom) {
  const { dataSource, columns } = props;
  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
}

export default TableCustom;
