import React from 'react';
import axios, { post } from 'axios';

const LoadFile = () => {

    const handleSubmit=(e)=>{
        console.log(
            e.target.files[0]
        );
    }

    return (
        <div>
            <h1>Upload route</h1>
          <label>
            Upload file:
            <input type="file" name="files[]" id="file" onChange={handleSubmit} />
          </label>
        </div>
        
      );
}


export default LoadFile;

