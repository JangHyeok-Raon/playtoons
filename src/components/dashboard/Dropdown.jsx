import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

/**
* Dropdown 리스트를 만든다
* ex) 
      const typeDataList = {
        "result": 0,
        "types": [
          {
            "id": "1",
            "code": "webtoon",
            "name": "ウェブトゥーン"
          },
        ]
      };
      <Dropdown 
        name={'typeId'}
        className={''}
        dataList={typeDataList} 
        selected={selectedItem} 
        handleItemClick={handleItemClick}/>
* @version 1.0.0
* @author 이현국
* @param dataList 아이템 리스트
* @param selected 선택된 아이템
*/
export default forwardRef(function Dropdown(props, ref) {
  const { name, dataList, selected, className, disabled, handleItemClick } = props;
  const [ isShowDropdown, setShowDropdown ] = useState(false);
  const [ stateSelectedItem, setStateSelectedItem ] = useState(undefined);
  
  //==============================================================================
  // hook & render
  //==============================================================================
  const setInitItem = (id) => {

    let selectedItem = dataList?.[0];

    if( id !== undefined ){
      for( let i = 0; i < dataList?.length; i++ ){
        const item = dataList?.[i];
        if( item?.id === id || item?.code === id ){
          selectedItem = item;
          break;
        }
      }
    }
    setSelectedItem(selectedItem);
  };

  const setSelectedItem = (item) => {
    setShowDropdown(false);
    setStateSelectedItem(item);
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  const handleToggle = () => {
    if (dataList !== undefined && dataList.length > 0 && !disabled) {
      setShowDropdown(!isShowDropdown);
    }
  };

  const handleOptionClicked = (item) => () => {
    if( stateSelectedItem?.id !== item.id || stateSelectedItem?.code !== item.code ){
      setSelectedItem(item);
      handleItemClick?.(item);
    }
  };

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderLiElements = () => {
    return dataList?.map((item, index) => {
      return (
        <li 
          key={index} 
          value={item?.id}
          onClick={handleOptionClicked(item)} >
            <a >
              { item?.name || item?.title || '' }
            </a>
        </li>
      );
    });
  };

  
  
  useImperativeHandle(ref, () => ({
    setSelected: (id) => {
      setInitItem(id);
    }
  }));

  useEffect(() => {
    //select 아이템 
    if( dataList ){
      setInitItem(selected);
    }
  }, [selected, dataList]);

  return (
    <>
      <div className={`btn_select1 `}>
        <button
          type="button"
          className={`btn_select_drop ${className} ${disabled && 'dis'}`}
          onClick={handleToggle} 
          >
          {stateSelectedItem?.name || stateSelectedItem?.title }

          <FontAwesomeIcon className={`fa-solid ${disabled && 'dis'}`} icon={faChevronDown} />
          <div
            className={`select_list ani div ${isShowDropdown ? 'on' : 'close'}`}
          >
            <ul>
              {
                renderLiElements()
              }
            </ul>
          </div>
          <input type='hidden' name={name} defaultValue={stateSelectedItem?.id} />
        </button>

      </div>
    </>
  );
});

