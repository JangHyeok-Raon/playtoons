import { getPostCategoryListFromServer } from '@/services/dashboardService';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import ErrorMessage from './ErrorMessage';
import Select from './Select';

/**
*
   <Category 
    name={'categoryId'}
    className={'select1 wid1'}
    typeId={stateType?.id} />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Category(props, ref) {
  const {name, className, typeId, selected: categorySelected, handleClickItem, disabled, disabledText} = props;
  const [stateTypeId, setStateTypeId] = useState(typeId);
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const refSelect = useRef();

  const getCategory = async () => {
    const {status, data} = await getPostCategoryListFromServer(stateTypeId);
    
    if( status === 200 ){
      setStateList( data?.categories );
    }
    else{
      setStateError( data );
    }
  };


  useEffect(() => {
    if( categorySelected !== undefined ){
      refSelect.current.setSelected(categorySelected);
    }
  }, [stateList]);


  useEffect(() => {
    setStateTypeId(typeId);
  }, [typeId]);

  useEffect(() => {
    if( stateTypeId !== undefined ){
      getCategory();
    }
  }, [stateTypeId]);

  return (
    <>

      <Dropdown
        ref={refSelect}
        name={name}
        className={`fw400 ${className}`}
        dataList={stateList} 
        selected={categorySelected}
        disabled={disabled}
        disabledText={disabledText}
        handleItemClick={handleClickItem}/>

      <ErrorMessage error={stateError} />
    </>
  );
}
