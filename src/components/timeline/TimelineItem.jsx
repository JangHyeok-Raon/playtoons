import { TIMELINE_DELAY } from "@/common/constant";
import useFilePath from "@/hook/useFilePath";
import { faPenToSquare, faTrash } from "@fortawesome/pro-light-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import {
  faChevronLeft,
  faCommentQuote,
  faHeart,
  faShare
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSwiper } from "swiper/react";

const TimelineItem = ({ item, isActive }) => {
  const [isControlShow, setIsControlShow] = useState(false);
  const { filePath: thumbnailImage, loading: thumbnailImgLoading } =
    useFilePath(item?.thumbnailImage);
  const { filePath: profileImage, loading: profileImgLoading } = useFilePath(
    item?.author?.profileImage
  );
  const [stateTime, setStateTime] = useState(0);
  const [stateIsRunning, setStateRunning] = useState(false);
  const swiper = useSwiper();
  const UPDATE_TIME = 10;

  const handleControlPopup = () => {
    setStateRunning(isControlShow ? true : false);
    setIsControlShow(!isControlShow);
  };
  
  useEffect(() => {
    setStateRunning(isActive);
  }, [isActive]);

  useEffect(() => {
    let interval = undefined;
    if(stateIsRunning){
      if( stateTime >= TIMELINE_DELAY ){
        setStateRunning(false);
        swiper.slideNext();
      }

      interval = setInterval(() => {
        setStateTime((stateTime + UPDATE_TIME));
      }, UPDATE_TIME);
    } else {
      if( interval ){
        clearInterval(interval);
      }
      setStateTime(0);
    }

    return () => {  clearInterval(interval);  }
  }, [stateTime, stateIsRunning]);

  return (
    <div className={`col ${isActive ? "active" : ""}`}>
      <div className="bt_bar">
        <div className="bar">
          <span className="" style={{ width: `${(stateTime / TIMELINE_DELAY) * 100}%` }}></span>
        </div>
      </div>
      <div className="thumb">
        {!thumbnailImgLoading && <ImgSpan bgImg={thumbnailImage}></ImgSpan>}
      </div>
      <div className="cont">
        <p className="t1">{item?.title}</p>
        <div className="t_profile">
          {!profileImgLoading && (
            <ImgSpan className="im" bgImg={profileImage}></ImgSpan>
          )}

          <p>{item?.nickname}</p>
        </div>
        <button type="button" className="btn-pk n blue">
          フォロー
        </button>
      </div>

      <div className="bt_top">
        <button type="button" className="btn01 view-m">
          <span className="i">
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="hidden">prev</span>
        </button>
        <button
          type="button"
          className="btn01"
          onClick={() => handleControlPopup()}
        >
          <span className="i">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </span>
        </button>
        {
          isControlShow && 
            <div className="box_drop">
              <ul>
                <li>
                  <a href="#" >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    修正
                  </a>
                </li>
                <li>
                  <a href="#" >
                    <FontAwesomeIcon icon={faTrash} />
                    削除
                  </a>
                </li>
                {/*<!-- <li><a href="#" onclick="showDrop('popReport'); return false;"><i className="fa-light fa-flag"></i>通報</a></li> -->*/}
              </ul>
            </div>
        }

      </div>
      <div className="bt_botm">
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <span>{item?.likeCount}</span>
        </button>
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faCommentQuote} />
          </span>
          <span>{item?.viewCount}</span>
        </button>
        <button type="button" className="btn01">
          <span className="i">
            <FontAwesomeIcon icon={faShare} />
          </span>
          <span className="hidden">share</span>
        </button>
      </div>
    </div>
  );
};

const ImgSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;

export default TimelineItem;
