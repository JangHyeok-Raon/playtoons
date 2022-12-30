import React from 'react';
import { useState } from 'react';
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useImperativeHandle, forwardRef } from 'react';


export default forwardRef( function ArrowRight(props, ref) {
  const { className, callback, value, index } = props;
  const [stateRotate , setStateRotate] = useState(false);
  
  const handleClickArrow = (event) => {
    callback?.(value, !stateRotate, index);
    setStateRotate(prev => !prev);
  };

  useImperativeHandle(ref, () => ({
    init: () => {
      setStateRotate(false);
    },
    setRotate: (isRotate) => {
      setStateRotate(isRotate);
    },
    getValue: () => {
      return value;
    },
  }));

  return (
    <FontAwesomeIcon 
      className={`transition ${className} ${stateRotate ? 'dsi_rotate' : ''}`} 
      icon={faAngleRight}  
      onClick={handleClickArrow}
      />
  )
})
