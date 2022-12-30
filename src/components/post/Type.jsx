import { useWindowSize } from "@/hook/useWindowSize";
import { getTypeAction } from "@/modules/redux/ducks/dashboard";
import { getPostTypeListFromServer } from "@/services/dashboardService";
import { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../dashboard/ErrorMessage";

/**
*
  const handleClickType = (typeItem) => {
    console.log('handleClickType', typeItem);
    setStateType(typeItem);
  };

  <Type
    name={'typeId'}
    callback={handleClickType}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default forwardRef( function Type(props, ref) {
  const {name, callback, onClick, selected, disabled} = props;
  const [stateList, setStateList] = useState(undefined);
  const [stateError, setStateError] = useState(undefined);
  const [stateDisabled, setStateDisabled] = useState(undefined);
  const reduxType = useSelector(({dashboard}) => dashboard.types);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();

  //==============================================================================
  // function
  //==============================================================================
  const initCheckecInList = () => {
    stateList?.forEach((item, i) => {
      item.checked = false;
    });
  };

  const getChecked = (item) => {
    const tempId = selected === undefined ? 0 : selected;
    return item.id === tempId;
  };

  const setCheckedToList = (list) => {
    return list.map( (item, i) => {
      return {
        ...item,
        checked: getChecked(item)
      }
    } );
  };

  const setSelectedInStateList = (typeId) => {
    setStateList( stateList?.map((item) => {
      return {
        ...item,
        checked: item.checked = typeId === item.id
      }
    }) );
  };
  
  const setFristSelectedInStateList = () => {
    setStateList( stateList?.map((item, index) => {
      return {
        ...item,
        checked: item.checked = 0 === index
      }
    }) );
  };


  //==============================================================================
  // api
  //==============================================================================

  //==============================================================================
  // event
  //==============================================================================

  const handleClickItem = (event, item) => {
    if( stateDisabled ){
      event.preventDefault();
      return false;
    }

    initCheckecInList();
    item.checked = true;
    onClick?.( item );
  };

  //==============================================================================
  // hook & render
  //==============================================================================

  const renderTypeListElements = () => {
    return stateList?.map((item, index) => {
      let isFirstLine = false;
      if( windowSize.width < 468 ){
        isFirstLine = index < (stateList.length / 2);
      }

      return (
        <Fragment key={index}>
          <label className={`inp_txchk`} >
            <input
              type="radio"
              name={name}
              data-id={item.id}
              data-index={index}
              defaultValue={item.id}      //code or id
              defaultChecked={item.checked}
              onClick={(e) => handleClickItem(e, item)}
            />
            
            <span className={`${stateDisabled ? 'inp_disabled' : ''} ${item.checked ? 'inp_checked' : ''}  ${isFirstLine && 'mb8'}`}>{item.name}</span>
          </label>
        </Fragment>
      );
    });
  };
  
  useImperativeHandle(ref, () => ({
    getTypeList: () => {
      return stateList;
    },
    setSelected: (typeItem) => {
      setStateDisabled(true);
      setSelectedInStateList(typeItem?.id);
    },
    setSelectedForEmptySeries: () => {
      setFristSelectedInStateList();
    },
    setDisabled: (disabled) => {
      setStateDisabled(disabled);
    },
  }));

  

  useEffect(() => {
    if( stateList ){
      callback?.(stateList[0]);
    }
  }, [stateList]);

  useEffect(() => {
    setStateDisabled(disabled);
  }, [disabled]);

  useEffect(() => {
    if( reduxType ){
      if( reduxType.result === 0 ){
        setStateList( setCheckedToList(reduxType?.types) );
      }
      else{
        setStateError(reduxType);
      }
    }
    else{
      dispatch( getTypeAction() );
    }
  }, [selected, reduxType]);


  return (
    <>
      {
        renderTypeListElements()
      }
      <ErrorMessage error={stateError} />
    </>
  );
})
