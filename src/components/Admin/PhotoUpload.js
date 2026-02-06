import React, { useState } from "react";
import { Button } from "@mui/material";
import { uploadPhoto } from "../../api/photo";

function PhotoUpload({ locationId }) {
  const [files, setFiles] = useState([]);

  const send = async () => {
    const fd = new FormData();
    files.forEach(f => fd.append("images", f));
    fd.append("locationId", locationId);

    await uploadPhoto(fd);
    alert("Uploaded");
    window.location.reload();
  };

  return (
    <>
      <input
        type="file"
        multiple
        onChange={e => setFiles([...e.target.files])}
      />
      <Button size="small" onClick={send}>
        Upload
      </Button>
    </>
  );
}

export default PhotoUpload;
