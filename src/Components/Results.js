import React from "react";
import FileResult from "./FileResult";

export default function Results({ updateFiles }) {
  let resultsMarkup = [];
  if (updateFiles.length > 0) {
    resultsMarkup.push(
      <h3 key="files-exist">Files contained in the update:</h3>
    );
    let results = updateFiles.map((file) => (
      <FileResult
        key={file.id}
        id={file.id}
        location={file.location}
        checksum={file.checksum}
      />
    ));
    resultsMarkup.push(results);
  } else {
    resultsMarkup.push(<h3 key="no-files">No files to update</h3>);
  }

  return <div className="container results-container">{resultsMarkup}</div>;
}
