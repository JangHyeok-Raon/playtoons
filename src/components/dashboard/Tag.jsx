import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { useState } from 'react';
import { useRef } from 'react';
import { getTagFromServer, setTagToServer } from '@/services/dashboardService';
import { useImperativeHandle, forwardRef } from 'react';

import ErrorMessage from './ErrorMessage';

/**
* Tag Component
   <Tag 
    ref={refTag}
    name={"tags"}
    className={"inp_txt sch"}
    placeholder={text.tag_name} />
*
* @version 1.0.0
* @author 2hyunkook
* @param className
* @param placeholder
* @return
*/
export default forwardRef( function Tag(props, ref) {
  const { placeholder, className, name, list } = props;
  const [ stateList, setStateList ] = useState([]);
  const [ stateError, setStateError ] = useState(undefined);
  const refInput = useRef();
  const refContainer = useRef();
  

  const checkExistInStateList = (keyword) => {
    for(let i = 0; i < stateList?.length; i++){
      if( stateList[i] === keyword ){
        return true;
      }
    }

    return false;
  };

  const removeItemInList = (list, id) => {
    return list.filter((item) => {
      return item.id !== id;
    });
  };

  //==============================================================================
  // api
  //==============================================================================

  const setTag =  async (keyword) => {
    const params = {
      'name' : keyword
    };
    
    const {status, data} = await setTagToServer(JSON.stringify(params));
    
    //409 이미 태그가 존재함.
    if( status === 201){
      //태그 state에 추가
      setStateList([
        ...stateList,
        data.tag
      ]);
      refInput.current.value = '';
    }
    else if( status === 409 ){
      //get tag id from server
      getTagId(keyword);
    }
    else{
      setStateError( String(data) );
    }
  };

  const getTagId = async (tagName) => {
    const formData = new FormData();
    formData.append('order', 'ASC');
    const {status, data} = await getTagFromServer(tagName, formData);
    
    if( status === 200 ){
      //find my id from list of result
      //태그 state에 추가
      setStateList([
        ...stateList,
        data?.tags[0]
      ]);
      refInput.current.value = '';
    }
    else{
      setStateError( String(data) );
    }
    
  };


  //==============================================================================
  // handle event
  //==============================================================================

  const handleFocus = (event) => {
    refContainer.current.classList.add("input_focus");
  };
  
  const handleBlur = (event) => {
    refContainer.current.classList.remove("input_focus");
  };

  const handleClickItem = (item) => {
    setStateList( removeItemInList(stateList, item.id) );
  };

  const handleClickSearch = (event) => {
    setStateError(undefined);
    const keyword = refInput.current.value;

    //list에서 같은 값이 있는지 확인
    if( checkExistInStateList(keyword) === false ){
      //태그 검색
      setTag(keyword);
    }
    else{
      // console.log("동일한 태그가 있습니다.");
    }
  };

  const handleEnter = (event) => {
    if( event.key === 'Enter' ){
      handleClickSearch?.(event);
      event.preventDefault();
    }
  };

  //==============================================================================
  // render & hook
  //==============================================================================

  const renderTagList = () => {
    return stateList?.map( (item, index) => {
      return <div className="i_tag mt10 pointer" key={index} onClick={() => handleClickItem(item)}>#{item.name}</div>
    });
  };

  useImperativeHandle(ref, () => ({
    setTagList: (list) => {
      setStateList(list);
    },
    getTagList: () => {
      let json = [];

      stateList.forEach((item) => {
        json.push({
          id: item.id,
          name: item.name,
        });
      });

      return json;
    },
    getTagsJsonObject: () => {
      let json = [];

      stateList.forEach((item) => {
        json.push(item.id);
      });

      return json;
    },
  }));

  useEffect(() => {
    if( list !== undefined ){
      setStateList(list);
    }
  }, [list]);

  return (
    <>
      <div className={className} ref={refContainer}>
        <button type="button" className="btns" title="検索"><FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClickSearch} /></button>
        <input ref={refInput} type="text" className="" name={name} placeholder={placeholder} onKeyDown={handleEnter} onFocus={handleFocus} onBlur={handleBlur} />
      </div>
      <div className="txt1">
        <div className="lst_tag">
          {
            renderTagList()
          }
        </div>
      </div>
      {
        stateError !== undefined &&
          <ErrorMessage error={stateError} />
      }
    </>
  );
})
