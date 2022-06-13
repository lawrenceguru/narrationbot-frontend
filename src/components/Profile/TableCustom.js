import React, { useState, useEffect } from "react";
import "./style.css";
import { Table, Space, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { getAccountUserID } from "../../actions/account";
import accountService from "../../services/account.service"

const deleteSeccessAlert = (_it) => {
  notification.open({
    message: 'Note',
    description:
      _it,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};



const TableCustom = () => {
  // const [originalData, setOriginData] = useState(initialData)
  // const [filteredData, setFilteredData] = useState(initialData)
  const [tableData, setTableData] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountUserID()).then((data) => {
      data.map((res) => {
        return res.key = res.id
      })
      setTableData(data)
    })
  }, [])
  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      sorter: (a, b) => a.language.localeCompare(b.language),
    },
    {
      title: 'Voicer',
      dataIndex: 'voicer',
      sorter: (a, b) => a.voicer.localeCompare(b.voicer),
    },
    {
      title: 'Text',
      dataIndex: 'sentence',
      sorter: (a, b) =>  a.sentence.localeCompare(b.sentence),
      render: (text, record) => (
        <>
        {record.sentence.length > 30 ? (
          <>{record.sentence.slice(0, 30)}...</>
        )
        : (
          <>{record.sentence}</>
        )}
        </>
      )
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      sorter: (a, b) =>  a.balance - b.balance,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href='#' onClick={() => downloadFile(record.url)}>Download</a>
          <a href='#' onClick={() => accountDel(record.id)}>Delete</a>
        </Space>
      )
    }
  ];
  const downloadFile = async (_downLoadUrl) => {
    var blob = await fetch(_downLoadUrl).then(r => r.blob());
    const Url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = Url;
    link.setAttribute('download', 'file.mp3'); //or any other extension
    document.body.appendChild(link);
    link.click();
  }
  const accountDel = (_id) => {
    accountService.accountDel(_id).then(({data}) => {
      deleteSeccessAlert('Seccessfully')
      setTableData((prev) => prev = prev.filter((_, i) => _id !== _.id))
    })
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }
  return (
    <Table  columns={columns} dataSource={tableData} onChange={onChange} />
  );
}

export default TableCustom