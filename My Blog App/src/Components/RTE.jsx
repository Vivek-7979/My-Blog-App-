// RTE : Real -time text editor . In our app , there will be a text editor that we are importing from thr tinymce 


import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


export default function RTE({name , control , label , defaultValue ='' } ) {  // Eh Component toh form ch transfer krne vaste sade kol hai "control" jo ki react-hook-form da part haii 


  return (
  
   <div className='w-full'> 
   
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>} {/* Je taah label hai taah label show krwao  */}

    <Controller
    name={name || "content"}
    control={control}
    render={({ field: { onChange, value } }) => (
      <Editor
        apiKey='48gpo4pmdfkbwb5i4rx628tuqek5h8g7n9y1v6bzxrlo4i5c'
        value={value || defaultValue}
        initialValue={defaultValue}
        onEditorChange={(content) => onChange(content)}
        init={{
          plugins: [
            'anchor',
             'autolink',
              'charmap',
               'codesample',
                'emoticons',
                 'link',
                  'lists',
                   'media',
                    'searchreplace',
                     'table',
                      'visualblocks',
                       'wordcount',
            'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'tinymceai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
          ],
          toolbar: 'undo redo | tinymceai-chat tinymceai-quickactions tinymceai-review | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          tinymceai_token_provider: async () => {
            await fetch(`https://demo.api.tiny.cloud/1/48gpo4pmdfkbwb5i4rx628tuqek5h8g7n9y1v6bzxrlo4i5c/auth/random`, { method: 'POST', credentials: 'include' });
            return { token: await fetch(`https://demo.api.tiny.cloud/1/48gpo4pmdfkbwb5i4rx628tuqek5h8g7n9y1v6bzxrlo4i5c/jwt/tinymceai`, { credentials: 'include' }).then(r => r.text()) };
          },
          uploadcare_public_key: '3d47f462ae55bd7cc7cb',
          height: 500,
          menubar: true,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
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

 