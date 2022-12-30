import React, { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
import { useState } from 'react';
import { useEffect } from 'react';
import useOutSideClick from '@/common/useOutSideClick';


/**
*
  <ToolTip 
    title={"Title"} 
    text={"text something123142"}
    handleClick={handleClickEvent} />
*
* @version 1.0.0
* @author 2hyunkook
* @param title title
* @param text contents text
* @param handleClick icon 클릭시 수행하고 싶은 event
* @return
*/
export default React.memo(function ToolTip(props) {
  const {title, text, handleClick} = props;
  const [isShow, setShow] = useState(false);
  const refPopup = useRef();

  
  const onClick = (e) => {
    handleClick?.(e);
    setShow(prev => !prev);
  }
  
  useEffect(() => {
    setShow(isShow);
  }, [isShow]);

  useOutSideClick(refPopup, onClick);
  
  return (
    <div className="relative" onClick={onClick}>
      {
        isShow && 
        <div ref={refPopup} className="tooltip-popup">
          <div className="tooltip-title">{title}</div>
          <div className="tooltip-text">{text}</div>
        </div>
      }
      <FontAwesomeIcon 
        icon={faCircleInfo}
        className={"fa-circle-info"}
        />
    </div>
  )
});
