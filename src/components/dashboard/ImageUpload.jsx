import { getFileDataUrl, isArrayFromPostContent } from "@/common/common";
import { FILE_MAX_SIZE } from "@/common/constant";
import {
  faCirclePlus,
  faCircleXmark,
  faTrashXmark,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import ErrorMessage from "./ErrorMessage";
import Image from "./Image";

/**
 * 
 * 이미지 파일 drag n drop, preivew 컴포넌트 
  <ImageUpload
    ref={refCoverImage}
    className={"small"}
    preview={imageUrl}
    id={"filebox2"}
    name={"coverImage"}                     
    text={text.drag_drop}    
    callback={callback}
    />
  
  ex) 이미지 파일 정보 가져오기 file, preview, hash
    refCoverImage.current.getImageFile();
  ex) hash 정보 input에 넣기 
    refCoverImage.current.setImageHash(hash);
  ex) image file 정보 input에 넣기 
    refCoverImage.current.setImage(fileUrl, hash);
 * @version 1.0.0
 * @author 2hyunkook
 * @param ref image file 접근을 위한 reference 
 * @param className box_drag 와 같이 쓰일 class name
 * @param preview image preview             file or file server url
 * @param id file input tag id
 * @param name upload parameter name 
 * @param text 평소에 보여질 drag n drop text
 * @param callback image value 설정 후 callback func
 */
export default forwardRef(function ImageUpload(props, ref) {
  const {
    className,
    preview,
    text,
    textEdit,
    name,
    id,
    callback,
    handleEdit,
    previewHash,
    renderType,
    multiple = false,
    isProduct = false,
  } = props;
  // file : 컴퓨터에서 선택된 file, preview : preview로 보여질 이미지(file url, data url), hash : 파일 업로드 후 받아온 hash
  const initImageObject = {
    file: undefined,
    preview: undefined,
    value: undefined,
    filename: "",
    fileLenth: "",
    mode: undefined,
  };
  const [stateImage, setStateImage] = useState(initImageObject);
  const [stateError, setStateError] = useState(undefined);

  //==============================================================================
  // function
  //==============================================================================
  const isMultiple = () => {
    return Array.isArray(stateImage?.preview);
  };

  /**
     업로드 전 preview 생성
  * @version 1.0.0
  * @author 2hyunkook
  * @param {*} file
  */
  const setPreviewImage = async (files) => {
    if (multiple || isProduct) {
      const results = await Promise.all(
        files.map(async (file) => {
          return await getFileDataUrl(file);
        })
      );

      setStateImage({
        ...stateImage,
        file: files,
        preview: results,
      });
    } else {
      const reader = new FileReader();
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }

      reader.onload = () => {
        setStateImage({
          ...stateImage,
          file: files[0],
          preview: reader.result,
        });
      };
    }
  };

  //==============================================================================
  // api
  //==============================================================================

  //==============================================================================
  // file drag n drop 설정
  //==============================================================================
  const onDrop = useCallback(async (acceptedFiles) => {
    setPreviewImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    noDragEventsBubbling: true,
    noKeyboard: true,
    maxSize: FILE_MAX_SIZE,
    onDropAccepted: (accept) => setStateError(undefined),
    onDropRejected: (reject) => handleRejected(reject),
    multiple: multiple,
  }); //isDragActive

  const InputProps = {
    ...getInputProps(),
    accept: "image/gif, image/jpg, image/jpeg, image/png",
    type: "file",
  };

  const RootProps = {
    ...getRootProps(),
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleRejected = (reject) => {
    let message = "";
    for (let i = 0; i < reject[0].errors.length; i++) {
      message += reject[0].errors[i].message;

      if (i !== reject[0].errors.length - 1) {
        message += " and ";
      }
    }

    setStateError(message);
  };

  const handlePreviewClose = (index) => {
    if (multiple) {
      console.log(stateImage);
      const files = stateImage.file.filter((item, i) => index !== i);
      const previews = stateImage.preview.filter((item, i) => index !== i);

      if (previews.length === 0) {
        setStateImage(initImageObject);
      } else {
        setStateImage({
          ...stateImage,
          file: files,
          preview: previews,
        });
      }
    } else {
      setStateImage(initImageObject);
    }
  };

  const handleClickEdit = () => {
    open();
    handleEdit?.();
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderPreview = () => {
    if (isMultiple()) {
      return (
        <div>
          {stateImage?.preview?.map((item, index) => {
            return (
              <div
                className={`fileview ${
                  index < stateImage.preview.length - 1 && "mb20"
                }`}
                key={index}
              >
                <div>
                  <Image hash={item} alt="" />
                </div>
                <button
                  type="button"
                  className="btn_del"
                  title="削除"
                  onClick={() => handlePreviewClose(index)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={"fileview"}>
          <div>
            <Image hash={stateImage?.preview} alt="" />
          </div>
          <button
            type="button"
            className="btn_del"
            title="削除"
            onClick={handlePreviewClose}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
      );
    }
  };

  useImperativeHandle(ref, () => ({
    setImageValueToInputTag: (hash) => {
      setStateImage({ ...stateImage, value: hash });
    },
    setImage: (fileUrl, hash) => {
      setStateImage({ ...stateImage, preview: fileUrl, value: hash });
    },
    getImageFile: () => {
      return stateImage.file;
    },
    setThumbnailImage: (hash) => {
      setStateImage({
        ...stateImage,
        value: hash,
        preview: hash,
        mode: "thumbnail",
      });
    },
    getImageInfo: () => {
      return stateImage;
    },
    setError: (msg) => {
      setStateError(msg);
    },
    checkToEmpty: () => {
      if (JSON.stringify(stateImage) === JSON.stringify(initImageObject)) {
        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    if (preview) {
      setStateImage({
        ...stateImage,
        preview: preview,
      });
    }
  }, [preview]);

  useLayoutEffect(() => {
    if (previewHash) {
      if (isArrayFromPostContent(previewHash)) {
        setStateImage({
          ...stateImage,
          preview: previewHash.split(","),
        });
      } else {
        setStateImage({
          ...stateImage,
          preview: previewHash,
        });
        // getImageUrl(previewHash);
      }
    }
  }, [previewHash]);

  useEffect(() => {
    if (stateImage.value) {
      callback?.();
    }
  }, [stateImage.value]);

  useEffect(() => {
    return () => {
      setStateError(undefined);
    };
  }, []);

  return (
    <>
      {(isProduct && (
        <>
          <div className={`${className}`} onClick={(e) => e.preventDefault()}>
            {/* upload에 쓰일 값  저장 */}
            <input
              type={"text"}
              name={name}
              defaultValue={stateImage?.value}
              style={{ display: "none" }}
            />
            {/* file input tag */}
            <input {...InputProps} id={id} />
            <label htmlFor={id} className="filetxt">
              <div {...RootProps} className={`wh100`}>
                {text === undefined ? (
                  <div className="ico fa-solid">
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                ) : (
                  <div className="txt">
                    <div className="ico fa-solid">
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </div>
                    <p className="t">{text}</p>
                  </div>
                )}
              </div>
            </label>
          </div>
          {stateImage?.preview?.length > 0 && (
            <div className="box_multy">
              {stateImage?.preview?.map((item, index) => {
                console.log("item : ", item);
                return (
                  <div key={`preview_${index}`} className="fileview">
                    <div>
                      <Image hash={item} alt="" />
                    </div>
                    <button
                      type="button"
                      className="btn_del"
                      title="削除"
                      onClick={() => handlePreviewClose(index)}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )) || (
        <>
          <div
            className={`${className}${isMultiple() ? "_multi" : ""}`}
            onClick={(e) => e.preventDefault()}
          >
            {/* upload에 쓰일 값  저장 */}
            <input
              type={"text"}
              name={name}
              defaultValue={stateImage?.value}
              style={{ display: "none" }}
            />
            {/* file input tag */}
            <input {...InputProps} id={id} />
            {stateImage?.preview === undefined ||
            stateImage?.preview.length === 0 ? (
              // input
              <label htmlFor={id} className="filetxt">
                <div {...RootProps} className={`wh100`}>
                  {text === undefined ? (
                    <div className="ico fa-solid">
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </div>
                  ) : (
                    <div className="txt">
                      <div className="ico fa-solid">
                        <FontAwesomeIcon icon={faCirclePlus} />
                      </div>
                      <p className="t">{text}</p>
                    </div>
                  )}
                </div>
              </label>
            ) : (
              <>
                {/* render preview  */}
                {/* //==============================================================================
                  // normal style
                  //============================================================================== */}
                {renderType === undefined && renderPreview()}

                {/* //==============================================================================
                  // thumbnail timeline style
                  //============================================================================== */}
                {renderType === "thumbnail" && (
                  <div className={"fileview2"}>
                    <div>
                      <Image hash={stateImage?.preview} alt="" />
                    </div>
                    <span className="f_tx">
                      {stateImage?.filename}
                      <em>{stateImage?.fileLenth}</em>
                    </span>
                    <button type="button" className="btn_del" title="削除">
                      <FontAwesomeIcon
                        icon={faTrashXmark}
                        onClick={handlePreviewClose}
                      />
                    </button>
                    <button
                      type="button"
                      className="btn-pk n blue"
                      onClick={handleClickEdit}
                    >
                      <span>{textEdit}</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <ErrorMessage error={stateError} />
        </>
      )}
    </>
  );
});
