import { getFileUrlFromServer } from "@/services/dashboardService";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

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
export default function ProfileSpan(props) {
  const { hash, className } = props;
  const [stateImage, setStateImage] = useState(undefined);

  const getImage = async (hash) => {
    const params = new FormData();
    const { status, data: result } = await getFileUrlFromServer(hash, params);

    if (status === 200) {
      setStateImage(result?.url);
    }
  };

  useEffect(() => {
    if( hash ){
      getImage(hash);
    }
  }, [hash]);

  return <span className={className} style={{backgroundImage: `url(${stateImage})`}}></span>
}
