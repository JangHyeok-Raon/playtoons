import {useEffect} from 'react';

/**
* ref 이외 영역을 클립했을경우 callback 수행
  useOutSideClick(refModal, handleClose);
*
* @version 1.0.0
* @author 이현국
*/
export default function useOutSideClick(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      if( ref.current && !ref.current.contains(event.target) ){
        callback?.();
      }
    };

    window.addEventListener('mousedown', handleClick);
  
    return () => {
      window.removeEventListener('mousedown', handleClick);
    }
  }, [ref, callback]);
  

}
