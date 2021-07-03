import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

// baseStyle is the base styling for the drag and drop element
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

// activeStyle is for when a file is being added
const activeStyle = {
  borderColor: '#2196f3',
};

// activeStyle is for when a file is accepted
const acceptStyle = {
  borderColor: '#00e676',
};

// activeStyle is for when a file is rejected
const rejectStyle = {
  borderColor: '#ff1744',
};

// FileDrop is the drag and drop file selector element
const FileDrop = (props) => {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      props.setFile(acceptedFiles[0]);
      setFiles(
        acceptedFiles.map((file) => {
          let preview = URL.createObjectURL(file);
          props.setUploadPreview(preview);
          return Object.assign(file, {
            preview,
          });
        })
      );
    },
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a picture, or click to select a picture</p>
      </div>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
    </section>
  );
};

export default FileDrop;
