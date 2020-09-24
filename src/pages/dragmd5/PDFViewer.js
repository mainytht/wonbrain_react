import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import Pagination from 'antd/es/pagination';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (props) => {
  const { alreadySrc } = props; //父组件传来的路径

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPage(numPages);
  };

  const handelOnChange = (pages) => {
    setPage(pages);
  };

  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Document
        file={alreadySrc} //文件路径
        onLoadSuccess={onDocumentLoadSuccess} //成功加载文档后调用
        onLoadError={console.error} //加载失败时调用
        renderMode="canvas" //定义文档呈现的形式
        loading="正在努力加载中" //加载时提示语句
        externalLinkTarget="_blank"
      >
        <Page pageNumber={page} scale={2} /> {/* scale 呈现的比例 */}
      </Document>
      <Pagination
        onChange={handelOnChange}
        total={totalPage * 10}
        current={page}
      />
    </div>
  );
};
export default PDFViewer;
