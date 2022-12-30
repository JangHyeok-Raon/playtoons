import { hideModal } from '@/modules/redux/ducks/modal';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function ErrorPopup(props) {
  const { message, buttonTitle, } = props; 
  const dispatch = useDispatch();

  const handleClickConfirm = () => {
    dispatch(hideModal())
  };

  return (
    <>
      <div className='error_popup_message'>{message}</div>
      <div className="btn-pk n blue w100p" onClick={() => handleClickConfirm()}>
        {buttonTitle}
      </div>
    </>
  )
}
