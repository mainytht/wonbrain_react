import React, { useRef, useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import SparkMD5 from "spark-md5";
import './index.less';

export default function index() {
    const [md5code, setMd5code] = useState('000000000000')
    const upload = useRef()
    const filelist = useRef()
    function onDrag(e) {
        console.log('ondrag')
        e.stopPropagation();
        e.preventDefault();
    }
    function onDrop(e) {
        console.log('ondrop')
        e.stopPropagation();
        e.preventDefault();
        imgPreview(e.dataTransfer.files);
        codeFile(e.dataTransfer.files);
    }
    function imgPreview(files) {
        let read = new FileReader();
        let imgUrl = filelist.current;
        read.readAsDataURL(files[0]);
        read.onload = function () {
            let url = read.result;
            let img = new Image();
            img.src = url;
            imgUrl.appendChild(img);
        };
    }
    function handlefileinput(e) {
        codeFile(e.target.files)
    }
    function codeFile(files) {
        // let params = new FormData();

        //   params.append("file", files[0]);
        //   axios.post("http://localhost:3000/upload", params);

        var blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice;
        var chunkSize = 2097152; // read in chunks of 2MB
        var chunks = "0";
        var currentChunk = 0;
        var spark = new SparkMD5.ArrayBuffer();
        var frOnload = e => {
            console.log(
                "\n 读取分段 " + parseInt(currentChunk + 1) + "。  总计： " + chunks
            );
            spark.append(e.target.result); // append array buffer
            currentChunk++;
            if (currentChunk < chunks) loadNext();
            setMd5code(spark.end());
            console.log("Hash 结果:\n" + md5code);
        };
        var frOnerror = function () {
            console.log("Error! reading file\n");
        };
        function loadNext() {
            var fileReader = new FileReader();
            fileReader.onload = frOnload;
            fileReader.onerror = frOnerror;
            var start = currentChunk * chunkSize,
                end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        let file = files[0];
        console.log("file name: " + file.name);
        chunks = Math.ceil(file.size / chunkSize);
        loadNext();
    }

    useEffect(() => {
        
        upload.current.addEventListener("dragenter", onDrag, false);
        upload.current.addEventListener("dragover", onDrag, false);
        upload.current.addEventListener("drop", onDrop, false);
        return () => {
            upload.current.removeEventListener("dragenter", onDrag);
            upload.current.removeEventListener("dragover", onDrag);
            upload.current.removeEventListener("drop", onDrop);
        }
    }, [])
    return (
        <div >
            <h1>gooooood</h1>
            <div className="upload" ref={upload}>
                <p>拖拽上传</p>
                <p>{md5code}</p>
            </div>
            <form method="POST" encType="multipart/form-data" onSubmit={()=>{return false}}>
                <input id="file" onChange={handlefileinput} type="file" placeholder="select a file" />
            </form>
            <div ref={filelist} height='400px'>

            </div>
        </div>
    )
}
