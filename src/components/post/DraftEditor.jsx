import { getErrorMessageFromResultCode } from '@/common/common';
import { setFileToServer } from '@/services/dashboardService';
import { getFileUrlFromServer } from '@/services/fileService';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from "react-redux";
import ErrorMessage from '../dashboard/ErrorMessage';

export default forwardRef(function DraftEditor(props, ref) {
  const { className, placeholder = '' } = props;
  const [ stateEditor, setStateEditor ] = useState( () => EditorState.createEmpty() );
  const [ stateIsFocus, setStateIsFocus ] = useState(false);
  const [ stateError, setStateError ] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const reduxSeries = useSelector(({ post }) => post.series);

  //==============================================================================
  // function 
  //==============================================================================
  const getRating = () => {
    return reduxSeries?.id === undefined ? "G" : reduxSeries?.rating;
  };

  //==============================================================================
  // api 
  //==============================================================================
  const setImageToServer = async (file, resolve, reject) => {
    // 폼데이터 구성
    const params = new FormData();
    params.append("authorId", reduxAuthors[0].id);
    params.append("subscribeTierId", "");
    params.append("productId", "");
    params.append("usage", 'post'); //profile, background, cover, logo, post, product, thumbnail, attachment
    params.append("type", "image"); //image, video, binary
    params.append("loginRequired", false); //언제 체크해서 보내는건지?
    params.append("licenseRequired", false); //product 에 관련된 항목 추후 확인 필요
    params.append("rating", getRating()); //G, PG-13, R-15, R-17, R-18, R-18G
    params.append("file", file);

    const { status, data: resultData } = await setFileToServer(params);

    //create sccuess
    if (status === 201) {
      getImage(resultData?.hash, resolve, reject);
    } else {
      //error 처리
      reject( status + getErrorMessageFromResultCode(resultData) );
      setStateError(status + getErrorMessageFromResultCode(resultData));
    }
  };

  const getImage = async (hash, resolve, reject) => {
    const params = new FormData();
    const { status, data } = await getFileUrlFromServer(hash, params);

    if (status === 200) {
      resolve({ data: { link:  data?.url }});
    } else {
      //error 처리
      reject( status + getErrorMessageFromResultCode(data) );
      setStateError(status + getErrorMessageFromResultCode(data));
    }
  };

  //==============================================================================
  // event 
  //==============================================================================
  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    if( stateError !== undefined ){
      setStateError(undefined);
    }
    setStateEditor(editorState);
  };


  const handleUploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
          setImageToServer(file, resolve, reject);
        };

        reader.readAsDataURL(file);
    });
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  
  
  useImperativeHandle(ref, () => ({
    isEmpty: () => {
      return stateEditor.getCurrentContent().hasText() === false;
    },
    setError: (text) => {
      setStateError(text);
    },
    getContent: () => {
      return draftToHtml(convertToRaw(stateEditor.getCurrentContent()));
    },
    setContent: (contentHtml) => {
      const contentBlock = htmlToDraft(contentHtml);
      if( contentBlock ){
        const newStateEditor = EditorState.createWithContent( ContentState.createFromBlockArray(contentBlock) );
        setStateEditor( newStateEditor );
      }
    },
  }));


  return (
    <>
      <div className={`${className} ${stateIsFocus ? 'on' : ''}`}>
        <Editor
            wrapperClassName="draft_editor"
            editorClassName="draft_contents"
            toolbarClassName="toolbar-class"
            toolbar={{    //2022.11.08 lhk- 
              options: ['inline', 'image'],
              inline: { 
                inDropdown: false, 
                options: ['bold', 'italic', 'underline', 'strikethrough',],
              },
              image: {
                popupClassName: 'draft_image_popup',
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,   // LEFT, RIGHT, CENTER
                uploadCallback: handleUploadImage,
                previewImage: true,
                inputAccept: 'image/gif, image/jpeg, image/jpg, image/png, image/svg',
                alt: { present: true, mandatory: false },
                defaultSize: {
                  height: 'auto',
                  width: 'auto',
                },
                // icon: image,
                // className: undefined,
                // component: undefined,
              },
              // emoji: {
              //   icon: emoji,
              //   className: undefined,
              //   component: undefined,
              //   popupClassName: undefined,
              //   emojis: [
              //     '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
              //     '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
              //     '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
              //     '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
              //     '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
              //     '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
              //     '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
              //     '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
              //     '✅', '❎', '💯',
              //   ],
              // },
            }} 
            placeholder={placeholder}
            // language 설정
            localization={{
                locale: 'en',
                // locale: 'ja',
            }}
            // 초기값 설정
            editorState={stateEditor || ''}
            // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
            onEditorStateChange={onEditorStateChange}
            onBlur={() => setStateIsFocus(false)}
            onFocus={() => setStateIsFocus(true)}
        />

      </div>
    
      <ErrorMessage error={stateError} />
    </>
  )
});
