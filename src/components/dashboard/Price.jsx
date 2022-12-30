import { setInputValueToNumber } from '@/common/common';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ErrorMessage from './ErrorMessage';

export default forwardRef( function Price(props, ref) {
  const {type, name, className, defaultValue, } = props;
  const [stateError, setStateError] = useState(undefined);
  const [stateValue, setStateValue] = useState(undefined);
  const refInput = useRef();
  const refPriceContainer = useRef();

  const handleChnage = (e) => {
    setStateError(undefined);
    setInputValueToNumber(refInput, e.target.value)
  };

  const handleFocus = (event) => {
    refPriceContainer.current.classList.add("input_focus");
  };
  
  const handleBlur = (event) => {
    refPriceContainer.current.classList.remove("input_focus");
  };
  
  useImperativeHandle(ref, () => ({
    setError: (msg) => {
      setStateError(msg);
      refInput.current.focus();
    },
    getValue: () => {
      return refInput.current.value;
    },
    setValue: (value) => {
      refInput.current.value = value;
    },
    isEmpty: () => {
      return refInput.current.value === '';
    },
    focus: () => {
      refInput.current.focus();
    },
  }));

  useEffect(() => {
    setStateValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <div ref={refPriceContainer} className="inp_txt sch">
        <input ref={refInput} type={type} className={className} name={name} defaultValue={ parseInt(stateValue) || '' } onChange={handleChnage} onFocus={handleFocus} onBlur={handleBlur} />
        <span className="won">PC</span>
      </div>

      <ErrorMessage error={stateError} />
    </>
  )
})
