import { getPostSeriesMine as getPostSeriesMineFromServer } from "@/services/postService";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "@COMPONENTS/dashboard/Select";
import ErrorMessage from "../dashboard/ErrorMessage";
import Dropdown from "../dashboard/Dropdown";

/**
*
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };

  <Series
    name={'seriesId'}
    className={'select1 wid1'}
    callback={handleClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function Series(props) {
  const {name, className, callback, selected, disabled, disabledText} = props;
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const reduxAuthors = useSelector( ({post}) => post?.authorMine?.authors );
  const refSelect = useRef();


  const getSeries = async () => {
    const form = new FormData();
    form.append( 'authorId', reduxAuthors[0].id );
    form.append( 'limit', 50 );

    const {status, data} = await getPostSeriesMineFromServer(form);
    if( status === 200 ){
      // setStateList( data?.series );
      //2022.10.28 lhk- series  공란 추가 
      const list = data?.series;
      list.unshift({id: undefined, name: undefined, type: undefined, category: undefined});
      setStateList( list );
      callback?.(data.series[0]);
    }
    else{
      setStateError( data );
    }
  };

  const handleClickItem = (item) => {
    console.log('item', item);
    callback?.(item);
  };

  useEffect(() => {
    refSelect.current.setSelected(selected);
  }, [stateList]);

  useEffect(() => {
    if( reduxAuthors && reduxAuthors?.length > 0 ){
      getSeries();
    }
  }, []);

  return (
    <>
      <Dropdown
        ref={refSelect}
        name={name}
        className={`fw400 ${className}`}
        dataList={stateList} 
        disabled={disabled}
        disabledText={disabledText}
        handleItemClick={handleClickItem}/>
      <ErrorMessage error={stateError} />
    </>
  );
}
