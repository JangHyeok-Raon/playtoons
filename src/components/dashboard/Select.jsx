import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

/**
*
  <Select 
    name={"typeId"}
    className={"select1 wid1"}
    dataList={stateTypeList}
    disabled={true}
    disabledText={"編集不可"}
    selected={item.code}
    handleItemClick={handleItemClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param name parameter name
* @param dataList option list
* @param disabled disabled
* @param handleItemClick option click
* @return
*/
export default forwardRef( function Select(props, ref) {
  const {name, className, dataList, disabled, selected, handleItemClick, disabledText } = props;
  const [stateDisabled, setStateDisabled] = useState(false);
  const refSelect = useRef();

  const getName = (item) => {
    return item.name === undefined ? item?.title : item?.name;
  };

  const getOptionElements = () => {
    if( dataList === undefined || dataList.length === 0 ){
      <option value={''} selected disabled  > </option>;
      return;
    }

    return dataList.map((item, index) => {
      return <option key={index} value={item?.id} >{getName(item)}</option>;
    });
  };

  const setSelectedItem = (id) => {
    const select = refSelect.current;
    const selctedId = id;
    if( select !== null && selected !== undefined ){
      dataList?.map((item, index) => {
        if( item.id === selctedId ){
          select.selectedIndex = index;
          select.options[index].setAttribute("selected", true);
          return index;
        }
      });
    }
    
  };

  const handleClickSelect = () => {
    const select = refSelect.current;
    
    handleItemClick?.(select.options[select.selectedIndex]);
  };

  // ref.current로 접근하여 사용
  useImperativeHandle(ref, () => ({
    setSelected: (id) => {
      setSelectedItem(id);
    },
  }));

  useEffect(() => {
    setStateDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    if( selected !== undefined ){
      setSelectedItem(selected);
    }
  }, [selected]);

  return (
    <>
      {
        stateDisabled ? 
          <select name={name} id={name} className={className} disabled>
            <option value="">{disabledText}</option>
          </select>
        : 
          <select ref={refSelect} name={name} id={name} className={className} onChange={handleClickSelect}  >
            {
              getOptionElements()
            }
          </select>
      }
    </>
  );
} );
