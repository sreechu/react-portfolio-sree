import React from "react";
import __html from "../SreeResumeStatic/SreeCharanResumeStatic.js";

const template = { __html };

function ResumeHTML() {
  return (
    <div className="screen-share">
      <span dangerouslySetInnerHTML={template} />
    </div>
  );
}

export default ResumeHTML;
