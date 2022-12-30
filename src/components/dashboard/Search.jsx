import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, useRef, useState } from "react";

import ErrorMessage from './ErrorMessage';

export default React.memo(forwardRef( function Search(props, ref) {
  const { placeholder, className, name, onClick } = props;
  const [ stateError, setStateError ] = useState(undefined);
  const refInput = useRef();
  const refContainer = useRef();
  

  //==============================================================================
  // handle event
  //==============================================================================

  const handleFocus = (event) => {
    refContainer.current.classList.add("input_focus");
  };
  
  const handleBlur = (event) => {
    refContainer.current.classList.remove("input_focus");
  };

  const handleClickSearch = (event) => {
    setStateError(undefined);
    const keyword = refInput.current.value;

    onClick?.(keyword);
  };

  const handleEnter = (event) => {
    if( event.keyCode === 13 ){
      handleClickSearch?.(event);
      event.preventDefault();
    }
  };

  //==============================================================================
  // render & hook
  //==============================================================================

  return (
    <>
      <div className={className} ref={refContainer}>
        <button type="button" className="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClickSearch} /></button>
        <input ref={refInput} type="text" className="" name={name} placeholder={placeholder} onKeyDown={handleEnter} onFocus={handleFocus} onBlur={handleBlur} />
      </div>

      <ErrorMessage error={stateError} />
    </>
  );
}));
