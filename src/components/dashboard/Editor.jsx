import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getFileUrlFromServer, setFileToServer } from "@/services/dashboardService";

/**
*
   editor 
   
   <Editor />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Editor(props) {
  const setFile = async (file, resolve, reject) => {
    const params = new FormData();
    // params.append("authorId", "");               
    // params.append("subscribeTierId", "");        
    // params.append("productId", "");
    params.append("type", "image");                 //image, video, binary
    params.append("usage", "post");                //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("loginRequired", false);
    params.append("licenseRequired", false);        //product 에 관련된 항목 추후 확인 필요
    params.append("rating", "G");                   //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", file);

    const {status, data: result} = await setFileToServer(params);
    console.log('setFileToServer', status, result);
    
    if( status === 201 ){
      //get file url
      getFile(result?.hash, resolve, reject);
    }
    else{
      reject("Error : " + result?.result + ", " + file?.name);
    }
  };

  const getFile = async (hash, resolve, reject) => {
    const {status , data: result} = await getFileUrlFromServer(hash);
    console.log('getFile', status, result);
    
    if( status === 200 ){
      resolve({
        default: result?.url
      });
    }
    else{
      reject("Error : " + result?.result + ", " + result?.url);
    }
  };

  const uploadAdapter = (loader) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            loader.file.then((file) => {
                body.append("files", file);
                
                setFile(file, resolve, reject);

              });
            });
      }
    }
  };

  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  };

  return (
    <div className="ckeditor_container">
      <CKEditor
          editor={ ClassicEditor }
          data=""
          config={{
            // removePlugins: [ 'Heading', 'MediaEmbed' ]
          }} 
          onReady={ editor => {
            uploadPlugin(editor);
            console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
    </div>
  );
}
