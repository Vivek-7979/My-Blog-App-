// RTE : Real -time text editor . In our app , there will be a text editor that we are importing from thr tinymce 


import React from 'react'

import { Editor } from '@tinymce/tinymce-react'  // This is backbone of this file . In this , we have the access of the Editor component directly that is pre-designed .
import { Controller } from 'react-hook-form'    // We will use the editor with the help of the react-hook-form library as this is the best way to do so 


export default function RTE({name , control , label , defaultValue ='' } ) {  // Eh Component toh form ch transfer krne vaste sade kol hai "control" jo ki react-hook-form da part haii 


  return (
  
   <div className='w-full'> 
   
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>} {/* Je taah label hai taah label show krwao  */}

    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => (
       
        // We got this editor from the tinymce { To use its all functiionality we have read its documentataion deeply ... As , this all syntax and feature is of the tinymce }
        <Editor
        initialValue={defaultValue}
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
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",

            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"

        }}  // This toolbar , plugins , content_style are the parts of the tinymce's features { Don't worry about is as it is the part of tinymce and to understand it fully we have to read its documentation }

        onEditorChange={onChange}
        />
    )}

    />  {/* This everthing is inside the Controller - that is the part of the react-hook-form library . As , it is best way to display/use the editor from the tinymce in the application (blog app ) */}

     </div>
  
   






//  Easy way but not the best as our application needs teh reference of it     
//  <Editor
// initialValue='Default value'
// init={
//     {branding : false, 
//         height: 500,
//         menubar:true,
//     plugins : [
//         'advlist autolink lists image charmap print preview anchor',
//         'searchreplace visualblocks code fullscreen',
//         'insertdatetime media table paste code help wordcount'
//     ],
// toolbar :''
// }
// }
// /> 
  
  )
}

 