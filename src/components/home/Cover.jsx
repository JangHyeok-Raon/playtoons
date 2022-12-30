import { setReduxOfNovel, setReduxOfWebtoon } from "@/common/common";
import { faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CurationItems from "./CurationItems";

const Cover = ({ curation }) => {
  const dispatch = useDispatch();

  const getLink = (id) => {
    switch(id){
      default : //webtoon, complete webtoon, progress webtoon
        return '/webtoon';
      case '44':  
        return '/novel';
      case '45':  
        return '/photo';
    }
  };

  const handleLinkOfSeeAll = useCallback((id) => {
    switch(id){
      default : 
        //webtoon
        setReduxOfWebtoon(dispatch, 'EVERY', 1, 'recent');
        return ;
      case '44':  
        //novel
        setReduxOfNovel(dispatch, {type: 'EVERY'});
        return ;
      case '45':  
        //photo
        return ;
      case '47':  
        //complete webtoon
        setReduxOfWebtoon(dispatch, 'COMPLETED', 1, 'recent');
        return ;
      case '48':
        //progress webtoon
        setReduxOfWebtoon(dispatch, 'SERIES', 1, 'recent');
        return ;
    }
  }, [curation]);

  return (
    <div className="main_area">
      <div className="inr-c">
        <div className="hd_titbox">
          <h2 className="m_tit1">{curation?.title}</h2>

          {
            //recently 41, webtoon 42, novel 44, photo 45, complete webtoon 47, webtoon in progress 48
            curation?.id !== '41' && (
              <Link to={`${getLink(curation?.id)}`} className="rgh btn-pk n blue2" onClick={() => handleLinkOfSeeAll(curation?.id)}><span className="ico_arr_link">すべてみる <FontAwesomeIcon icon={faAngleRight} className="fa-solid" /></span></Link>
            )
          }
        </div>
        <div className="lst_comic1 long">
          <CurationItems curationNum={curation?.id} />
        </div>
      </div>
    </div>
  );
};

export default Cover;
