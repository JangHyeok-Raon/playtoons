import useFilePath from "@/hook/useFilePath";
import { setCurrentAuthor } from "@/modules/redux/ducks/author";
import { setAuthorFollow } from "@API/authorService";
import SharePopup from "@COMPONENTS/author/detail/SharePopup";
import PostItems from "@COMPONENTS/author/PostItems";
import SeriesItems from "@COMPONENTS/author/SeriesItems";
import StoreItems from "@COMPONENTS/author/StoreItems";
import { faShare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Plan from "./Plan";

const Post = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;

  const location = useLocation();
  const tab = location?.state?.tab;

  const currentAuthor = useSelector(({ author }) => author.currentAuthor);
  const [selectTab, setSelectTab] = useState(tab ? tab : "POST");
  const [isSharePopupShow, setIsSharePopupShow] = useState(false);
  const { filePath: backgroundImgURL, loading: backgroundImgLoading } =
    useFilePath(currentAuthor?.backgroundImage);
  const { filePath: profileImgURL, loading: profileImgLoading } = useFilePath(
    currentAuthor?.profileImage
  );

  useEffect(() => {
    dispatch(setCurrentAuthor(id));
  }, [dispatch, id]);

  const handleFollow = useCallback(
    async (type) => {
      if (currentAuthor?.id) {
        const response = await setAuthorFollow(type, currentAuthor.id);
        if (type === "post") {
          if (response?.status === 201) {
            alert("SUCCESS");
          } else {
            alert(response?.data?.message);
          }
        } else {
          if (response?.status === 200) {
            alert("DELETE SUCCESS");
          } else {
            alert(response?.data?.message);
          }
        }
      }
    },
    [currentAuthor]
  );

  return (
    <div className="contents">
      <div className="wrap_author_detail">
        <div className="box_profile _longs">
          {/* ????????? default ??? ?????? */}
          {!backgroundImgLoading && (
            <ImgTmpProfileBgDiv
              className="pf_thumb"
              bgImg={backgroundImgURL}
            ></ImgTmpProfileBgDiv>
          )}
          {currentAuthor && (
            <div className="pf_txt">
              <div className="icon">
                {/* ????????? default ??? ?????? */}
                {!profileImgLoading && (
                  <img src={profileImgURL} alt="" />
                )}
              </div>
              <p className="h1">{currentAuthor?.nickname}</p>
              <p className="t1">{currentAuthor?.description}</p>
              <div className="btns">
                <Link
                  to=""
                  className="btn-pk n blue"
                  onClick={() => handleFollow("delete")}
                >
                  ????????????
                </Link>
                <Link
                  to=""
                  className="btn-pk n blue"
                  onClick={() => handleFollow("post")}
                >
                  ????????????
                </Link>
                <Link
                  to=""
                  className="btn-pk n blue2"
                  onClick={() => setIsSharePopupShow(true)}
                >
                  <FontAwesomeIcon icon={faShare} />
                  ????????????
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="inr-c">
          <div className="tabs ty2">
            <ul>
              <li
                className={selectTab === "POST" ? "on" : ""}
                onClick={() => setSelectTab("POST")}
              >
                <Link to="">
                  <span>??????</span>
                </Link>
              </li>
              <li
                className={selectTab === "SERIES" ? "on" : ""}
                onClick={() => setSelectTab("SERIES")}
              >
                <Link to="">
                  <span>????????????</span>
                </Link>
              </li>
              <li
                className={selectTab === "PLAN" ? "on" : ""}
                onClick={() => setSelectTab("PLAN")}
              >
                <Link to="">
                  <span>?????????</span>
                </Link>
              </li>
              <li
                className={selectTab === "STORE" ? "on" : ""}
                onClick={() => setSelectTab("STORE")}
              >
                <Link to="">
                  <span>?????????</span>
                </Link>
              </li>
            </ul>
          </div>
          {selectTab === "POST" && <PostItems />}
          {selectTab === "SERIES" && <SeriesItems />}
          {selectTab === "PLAN" && <Plan />}
          {selectTab === "STORE" && <StoreItems />}
        </div>
      </div>

      {isSharePopupShow && (
        <SharePopup onClose={() => setIsSharePopupShow(false)} />
      )}
    </div>
  );
};

const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Post;
