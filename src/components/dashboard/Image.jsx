import { getFileUrlFromServer } from "@/services/dashboardService";
import { useLayoutEffect, useState } from "react";

/**
*
  hash값으로 이미지 url을 가져와서 img 태그에 뿌려줌.
   <Image 
    className={"series_image"}
    hash={item.coverImage} 
    alt={"cover iamge"} />
*
* @version 1.0.0
* @author 2hyunkook
* @param className class name
* @param hash server에서 얻어온 hash
* @param alt img 태그에 들어갈 alt attribute
* @return
*/
export default function Image(props) {
  const { alt, hash, className='', title, onClick, params } = props;
  const [stateImage, setStateImage] = useState(undefined);
  const [stateError, setStateError] = useState(false);

  const getImage = async (hash) => {
    const formData = new FormData();
    if( params ){
      if( params.w ){ formData.append('w', params.w); }
      if( params.mw ){ formData.append('mw', params.mw); }
      if( params.q ){ formData.append('q', params.q); }
    }
    const { status, data } = await getFileUrlFromServer(hash, formData);

    if (status === 200) {
      setStateImage(data?.url);
    } else {
      setStateError(true);
    }
  };

  useLayoutEffect(() => {
    if( hash ){
      if ( hash?.startsWith("/static/media/") || hash?.startsWith("data:image") || hash?.startsWith("src/assets") ) {
        setStateImage(`${hash?.startsWith("src/assets") ? '/temp/' : '' }${hash}`);
      } else {
        getImage(hash);
      }
    }
  }, [hash]);

  return <img className={`${className}${stateError ? ' error' : ''}`} src={stateImage} alt={alt} title={title} onClick={onClick} loading="lazy" onError={() => setStateError(true)} />;
}
