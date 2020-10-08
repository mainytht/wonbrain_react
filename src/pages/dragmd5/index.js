import React, { useRef, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import SparkMD5 from 'spark-md5';
import './index.less';
import PDFViewer from './PDFViewer';

export default function index() {
  const [md5code, setMd5code] = useState('000000000000');
  const [pdffile, setPdffile] = useState('/智能简史.pdf');
  //this 3.pdf file is in /public folder
  const upload = useRef();
  const imgref = useRef();

  function onDrag(e) {
    console.log('ondrag');
    e.stopPropagation();
    e.preventDefault();
  }
  function onDrop(e) {
    console.log('ondrop');
    e.stopPropagation();
    e.preventDefault();
    imgPreview(e.dataTransfer.files[0]);
    codeFile(e.dataTransfer.files[0]);
  }
  function imgPreview(file) {
    let read = new FileReader();
    let imgUrl = imgref.current;
    read.readAsDataURL(file);
    read.onload = function () {
      let url = read.result;
      console.log(url);
      setPdffile(url);
      let img = new Image();
      console.log(url);
      img.src = url;
      imgUrl.appendChild(img);
    };
  }
  function handlefileinput(e) {
    console.log('fileinput');
    imgPreview(e.target.files[0]);
    codeFile(e.target.files[0]);
  }
  function codeFile(file) {
    // let params = new FormData();

    //   params.append("file", files[0]);
    //   axios.post("http://localhost:3000/upload", params);

    var blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    var chunkSize = 2097152; // read in chunks of 2MB
    var chunks = '0';
    var currentChunk = 0;
    var spark = new SparkMD5.ArrayBuffer();
    var frOnload = (e) => {
      console.log(
        '\n 读取分段 ' + parseInt(currentChunk + 1) + '。  总计： ' + chunks,
      );
      spark.append(e.target.result); // append array buffer
      currentChunk++;
      if (currentChunk < chunks) loadNext();
      setMd5code(spark.end());
      console.log('Hash 结果:\n' + md5code);
    };
    var frOnerror = function () {
      console.log('Error! reading file\n');
    };
    function loadNext() {
      var fileReader = new FileReader();
      fileReader.onload = frOnload;
      fileReader.onerror = frOnerror;
      var start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    console.log(file);
    chunks = Math.ceil(file.size / chunkSize);
    loadNext();
  }

  useEffect(() => {
    upload.current.addEventListener('dragenter', onDrag, false);
    upload.current.addEventListener('dragover', onDrag, false);
    upload.current.addEventListener('drop', onDrop, false);
    return () => {
      upload.current.removeEventListener('dragenter', onDrag);
      upload.current.removeEventListener('dragover', onDrag);
      upload.current.removeEventListener('drop', onDrop);
    };
  }, []);
  return (
    <div>
      <h1>gooooood</h1>
      <div className="upload" ref={upload}>
        <p>拖拽上传</p>
        <p>{md5code}</p>
      </div>
      {/* <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={() => {
          return false;
        }}
      >
      </form> */}
      {/* 源码把input包裹在form中，似乎不需要也可以 */}
      <input
        id="file"
        onChange={handlefileinput}
        type="file"
        placeholder="select a file"
      />

      <div ref={imgref} height="400px" />
      <PDFViewer alreadySrc={pdffile} />
    </div>
  );
}
