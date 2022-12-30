import { setReduxOfNovel, setReduxOfWebtoon } from "@/common/common";
import useFilePath from "@/hook/useFilePath";
import { useWindowSize } from "@/hook/useWindowSize";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TypeItem = ({ item }) => {
  const { filePath: thumbImage, loading } = useFilePath(item?.iconImage);
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const getMarginBottom = (item) => {
    if( windowSize.width < 961 ){
      //mobile 1, 3 마진 추가 
      if( item?.code === 'webtoon' || item?.code === 'illust' ){
        return true;
      }
    } else {
      //pc 1 마진 추가
      if(item?.code === 'webtoon'){
        return true;
      }
    }
    return false;
  };

  const getBackgroundColor = (item) => {
    switch (item?.code){
      default :
        return '#fff';
      case 'novel' :
        return '#13161a';
      case 'illust' :
        return '#424f58';
      case 'blog' :
        return '#596470';
      case 'photo' :
        return '#fff';
      case 'music' :
        return '#13161a';
    }
  };

  const getTextColor = (item) => {
    switch (item?.code){
      default :
        return 'c-black';
      case 'novel' :
        return '';
      case 'illust' :
        return '';
      case 'blog' :
        return '';
      case 'photo' :
        return 'c-black';
      case 'music' :
        return '';
    }
  };

  const handleClick = (item) => {
    if( 'webtoon' === item?.code ){
      setReduxOfWebtoon(dispatch, 'EVERY', 1, 'recent');
    } else if( 'novel' === item?.code ){
      setReduxOfNovel(dispatch, {});
    } 
  };

  return (
    <div className={`col${getMarginBottom(item) ? ' mb' : ''}`}>
      <Link to={`/${item?.code}`} onClick={() => handleClick(item)}>
        <div className="thumb wid1">
          {!loading && <img src={thumbImage} alt="" />}
        </div>
        <div className="txt" style={{ backgroundColor: `${getBackgroundColor(item)}` }}>
          <p className={`${getTextColor(item)}`}>{item?.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default TypeItem;
