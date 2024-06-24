// src/components/FileTransfer.js
import React, { useEffect, useState } from 'react';
import socket from '../socket';

const FileTransfer = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    socket.on('receive-file', (data) => {
      console.log('File received:', data);
      setProgress(100);
    });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTransfer = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      socket.emit('send-file', { file: reader.result });
      setProgress(50);
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleTransfer}>Transfer</button>
      <div>Progress: {progress}%</div>
    </div>
  );
};

export default FileTransfer;
