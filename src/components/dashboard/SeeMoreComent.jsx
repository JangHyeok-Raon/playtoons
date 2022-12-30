import { useCallback, useEffect, useState } from 'react';

export default function SeeMoreComent(props) {
  const { text, meta, callback } = props;
  const [ stateShow, setStateShow ] = useState(true);

  const getMoreComent = useCallback(() => {
    if( meta ){
      const { currentPage, totalPages} = meta;

      if( currentPage < totalPages){
        callback?.(currentPage + 1);
      }
    }
  }, [meta]);

  useEffect(() => {
    if( meta ){
      const { currentPage, totalPages} = meta;
  
      if( currentPage === totalPages || totalPages === 0){
        setStateShow(false);
      }
      else{
        setStateShow(true);
      }
    }
  }, [meta]);

  return (
    <>
      {stateShow && 
        <div className="botm">
          <div onClick={getMoreComent}>{text.see_more_coment}</div>
        </div>
      }
    </>
  )
}
