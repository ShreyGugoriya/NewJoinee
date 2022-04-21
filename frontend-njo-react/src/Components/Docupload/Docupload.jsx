import React, { useState } from "react";
import "./Docupload.css";
import Userheader from "../Userheader/Userheader";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Footer from "../Footer/Footer";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import axios from "axios";
import AsyncSelect from "react-select/async";

let formdata = new FormData();

const Docupload = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const loc = useLocation();

  const empid = loc.state.isValid;
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const [docValue, setDocValue] = useState(null);
  const [alldoc, setAlldoc] = useState([]);
  const [inputVal, setVal] = useState("");
  //const [doc_id, setDocid] = useState();

  const allowedFiles = ["application/pdf"];
  console.log("DOCCCCCCCCC", props);
  //function to show he uploaded documents
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(e.target.files[0]);
    // console.log(selectedFile.type);
    // console.log(selectedFile.name);
    if (e.target && e.target.files[0]) {
      formdata.append("file", selectedFile);
    }

    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
        setPdfFile("");
      }
    } else {
      console.log("please select a PDF");
    }
  };

  //post request to send the document to db
  const postDocument = () => {
    alert("Document Uploaded");
    console.log(docValue.doc_id);
    axios
      .post(
        ` http://localhost:8089/upload/${empid}/${docValue.doc_id}`,
        formdata
      )
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Logic for dropdown
  const fetchData = () => {
    console.log(" called");
    return axios
      .get(" http://localhost:8089/document/", {
        auth: {
          username: loc.state.username,
          password: loc.state.password,
        },
      })
      .then((result) => {
        //console.log(result.data);
        const res = result.data;
        setAlldoc(res);

        return res;
      });
  };

  const handleInputChange = (value) => {
    // console.log("this is called");
    // console.log(value);
    setVal(value);
  };

  const handleChange = (value) => {
    setDocValue(value);
  };

  return (
    <>
      <Userheader name="LOGOUT" props={props} />
      <div className="main_content3">
       
        <div className="container">
          {/* Upload PDF */}
          <form>
            <label>
              <h5>UPLOAD DOCUMENT</h5>
            </label>
            <br></br>
            <div className="form-upload-doc">
              <input
                type="file"
                className="form-control"
                onChange={handleFile}
              ></input>
              {pdfError && <span className="text-danger">{pdfError}</span>}
              <button type="button" class="btn btn-info" onClick={()=>{postDocument(); }}>
                UPLOAD
              </button>

              <AsyncSelect
                className="dropdown-doc"
                style={{ height: "100px", width: "10rem" }}
                cacheOptions
                defaultOptions
                value={docValue}
                getOptionLabel={(e) => e.doc_name}
                getOptionValue={(e) => e.doc_name}
                loadOptions={fetchData}
                onInputChange={handleInputChange}
                onFocus={handleChange}
                onChange={handleChange}
              />
              {/* {console.log(alldoc)} */}
              {console.log(docValue)}
            </div>
          </form>

          {/* View PDF */}
          <h5>VIEW UPLOADED DOCUMENT</h5>
          <div className="viewer">
            {/* render this if we have a pdf file */}
            {pdfFile && (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfFile}
                  plugins={[defaultLayoutPluginInstance]}
                ></Viewer>
              </Worker>
            )}

            {/* render this if we have pdfFile state null   */}
            {!pdfFile && <>No file is selected yet</>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Docupload;
