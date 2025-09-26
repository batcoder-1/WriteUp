import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import{Controller} from "react-hook-form";
import config from "../../config/config";
function RTE({control,defaultValue="",name,label}){
    // The control field is used to manage the form state
    // in plugins we have different plugins for the editor
    // console.log(2);
    return(
        <>
<div className="w-full">
  {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
  <Controller
  name={name}
control={control}   
render={({ field: { onChange } }) => (
  <Editor
    onEditorChange={onChange}
    apiKey={config.tinymceapikey}
     init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
          toolbar:
  "undo redo | blocks fontfamily fontsize | " +
  "bold italic underline strikethrough forecolor backcolor | " +
  "alignleft aligncenter alignright alignjustify | " +
  "bullist numlist outdent indent | " +
  "link image table | superscript subscript | " +
  "removeformat | code help",
content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
  />
    )}
  />
</div>
        </>
    )
}
export default RTE;
