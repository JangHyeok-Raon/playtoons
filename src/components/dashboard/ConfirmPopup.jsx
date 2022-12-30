import { hideModal } from '@/modules/redux/ducks/modal';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function ConfirmPopup(props) {
  const { message, buttonTitle, callback} = props; 
  const dispatch = useDispatch();

  const handleClickConfirm = () => {
    dispatch(hideModal())
  };

  return (
    <>
      <div className='error_popup_message'>{message}</div>
      <div className='flex'>
        <div className="btn-pk n blue2 w100p mr8" onClick={() => handleClickConfirm()}>
          {'キャンセル'}
        </div>
        <div className="btn-pk n blue w100p " onClick={() => callback?.()}>
          {buttonTitle}
        </div>
      </div>
    </>
  )
}
