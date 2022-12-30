import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/pro-solid-svg-icons";
import { useEffect } from 'react';
import { useRef } from 'react';

export default ( function ErrorMessage(props) {
  const { error, className = '' } = props;
  const refContainer = useRef();

  const onFocus = () => {
    
    
  };

  useEffect(() => {
    if( error ){
      window.scrollTo(0, refContainer.current.offsetTop / 2);
    }
  }, [error]);

  return (
    <>
      {
        error !== undefined &&
          <div ref={refContainer} className={`error_message_container ${className}`} tabIndex={0} id='error_container' onFocus={onFocus}>
            <FontAwesomeIcon 
              icon={faCircleXmark}
              className={"error_message_ico"} />
            <div className="error_message_text">{error}</div>
          </div>
      }
    </>
  )
});
