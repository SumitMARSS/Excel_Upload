import React, { useState } from "react";
import { parseExcelFile } from "../utils/excelParser";
import axios from "../api";
import "../styles.css"

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const data = await parseExcelFile(file);
      const response = await axios.post("/upload", { rows: data });
      setMessage(`Processed: ${response.data.processed}, Skipped: ${response.data.skipped}`);
      
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error uploading file.");
    }
  };

  return (
    <div className="upload-form">
      <h2>Upload Candidate Records</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
