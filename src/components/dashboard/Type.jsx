import { getTypeAction } from "@/modules/redux/ducks/dashboard";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import ErrorMessage from "./ErrorMessage";

/**
*
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };

  <Type
    name={'typeId'}
    className={'select1 wid1'}
    callback={handleClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Type(props, ref) {
  const {name, className, callback, selected, disabled, disabledText} = props;
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const reduxTypes = useSelector(({dashboard}) => dashboard.types);
  const dispatch = useDispatch();
  const refSelect = useRef();

  //==============================================================================
  // function
  //==============================================================================


  //==============================================================================
  // event
  //==============================================================================
  const handleClickItem = (option) => {
    callback?.(option);
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  useEffect(() => {
    if( reduxTypes ){
      if( reduxTypes.result === 0 ){
        setStateList( reduxTypes?.types );
        callback?.(reduxTypes.types[0]);
      }
      else{
        setStateError( String(reduxTypes) );
      }
    }
    else{
      dispatch( getTypeAction() );
    }
  }, [reduxTypes]);

  useEffect(() => {
    if( selected ){
      refSelect.current.setSelected(selected);
    }
  }, [selected, stateList]);

  return (
    <>
      <Dropdown 
        ref={refSelect}
        name={name}
        className={`fw400 ${className}`}
        dataList={stateList}
        handleItemClick={handleClickItem}
        disabled={disabled}
        disabledText={disabledText}
        />
      
      <ErrorMessage error={stateError} />
    </>
  );
}
