import * as LoadingData from '@/assets/loading.json';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Lottie from 'react-lottie';

/**
*
   loading lottie 구현된 버튼

   rx) 
      <Button
        className="btn-pk s blue2"
        onClick={(e, funSetButtonStatus) => handleItemClick(item, funSetButtonStatus)}
      >
        {text.dont_see}
      </Button>
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default forwardRef( function Button(props, ref) {
  const { className, text, children, onClick } = props;
  const [ stateStatus, setStateStatus ] = useState(undefined);

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: LoadingData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if( stateStatus === undefined ){
      setStateStatus('loading');
      onClick?.(event, setStateStatus);
    }
  };
  
  useImperativeHandle(ref, () => ({
    setStatus: (status) => {
      setStateStatus(status);
    }
  }));

  useEffect(() => {
    return () => {
      setStateStatus(undefined);
    }
  }, []);
  

  return (
    <div className={className} onClick={handleClick}>
      <div className="pull_width relative" >
        <span className={`${stateStatus === undefined ? '' : 'c_transparent'}`}>{text || children}</span>
        {
          stateStatus === 'loading' && 
            <span className='lottie'>
              <Lottie 
                options={defaultOptions}
                height={40}
                width={40}
                />
              </span>
        }
      </div>
    </div>
  )
})
