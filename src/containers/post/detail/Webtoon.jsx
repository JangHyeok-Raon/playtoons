import { getContentOfPost } from "@/common/common";
import IconWithText from "@/components/dashboard/IconWithText";
import Image from "@/components/dashboard/Image";
import SeeMoreComent from "@/components/dashboard/SeeMoreComent";
import PostItems from "@/components/webtoon/PostItems";
import useFilePath from "@/hook/useFilePath";
import { currentAuthorInit } from "@/modules/redux/ducks/author";
import { getCurrentPost, getPostReaction } from "@/modules/redux/ducks/post";
import { setAuthorFollow } from "@API/authorService";
import {
  faLock
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ReplyItems from "./ReplyItems";



const Webtoon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  // 현재 게시물의 아이디
  const id = params?.id;
  // 현재 게시물 상세 정보
  const currentPost = useSelector(({ post }) => post.currentPost);
  const userInfo = useSelector(({ login }) => login.userInfo);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const [ stateIsAddComent, setStateIsAddComent ] = useState(false);
  const { filePath: authorProfileImgURL, loading: authorProfileImgLoading } =
    useFilePath(currentPost?.author?.profileImage);
  const { filePath: backgroundImgURL, loading: backgroundImgLoading } =
    useFilePath(currentPost?.author?.backgroundImage);
  // content 접근 여부로 Lock 판단
  const isLock = currentPost?.isLock;
  // 로그인 한 사용자
  const { filePath: myProfileImgURL, loading: myProfileImgLoading } =
    useFilePath(userInfo?.profileImage || reduxAuthors?.[0].profileImage);

  useEffect(() => {
    if( id ){
      dispatch(getCurrentPost({ id: id }));
    }
  }, [dispatch, navigate, id, location.pathname]);

  useEffect(() => {
    
    return () => {
      setStateIsAddComent(false);
    }
  }, []);



  const handleFollow = useCallback(
    async (type) => {
      if (currentPost?.author?.id) {
        const response = await setAuthorFollow(type, currentPost.author.id);

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
    [currentPost]
  );

  const handleCurrentAuthorInit = useCallback(() => {
    dispatch(currentAuthorInit());
  }, [dispatch]);

  const getComent = (page, isAdd) => {
    setStateIsAddComent(isAdd);
    dispatch(getPostReaction({ postId: id, limit: 3, page: page }))
  };

  return (
    <>
      {currentPost && (
        <>
          <div className="wrap_detail">
            <div className="area_detail2">
              <h2 className="h1">{currentPost.title}</h2>
              <p className="d1">
                {currentPost.startAt ? moment(currentPost.startAt).format("YYYY/MM/DD HH:mm") : '日がいません。'}
              </p>
              <p className="t1 c-gray">{currentPost.outline}</p>
            </div>

            <div className="area_webtoon">
              { isLock ? (
                  <>
                    <Image hash={require("@IMAGES/sampleImage.png")} />
                  
                    <div className="area_lock">
                      <div>
                        <p>
                          <FontAwesomeIcon icon={faLock} />
                        </p>
                        <p>500PC /月</p>
                        <p>クリエイターを支援してコンテンツ解禁！</p>
                        <Link
                          to={`/author/post/${currentPost?.author?.id}`}
                          state={{ tab: "PLAN" }}
                          className="btn-pk s blue bdrs"
                          onClick={handleCurrentAuthorInit}
                        >
                          <span>支援する</span>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  getContentOfPost( currentPost?.content )
                )
              }
            </div>

            {/* <div className="area_detail2">
              <p className="t1 c-gray">
                リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。
              </p>
            </div> */}

            <div className="area_detail3">
              <div className="box_profile">
                {!backgroundImgLoading && (
                  <ImgTmpProfileBgDiv bgImg={backgroundImgURL} className={`${backgroundImgURL ? '' : 'empty'}`} />
                )}

                <div className="pf_txt">
                  <div className="icon">
                    {!authorProfileImgLoading && (
                      <img src={authorProfileImgURL} className={`${authorProfileImgURL ? '' : 'empty'}`}  />
                    )}
                  </div>
                  <p className="h1">{currentPost?.author?.nickname}</p>
                  <div className="btns">
                    <Link
                      to=""
                      className="btn-pk n blue"
                      onClick={() => handleFollow("delete")}
                    >
                      <span>임시언팔</span>
                    </Link>
                    <Link
                      to=""
                      className="btn-pk n blue"
                      onClick={() => handleFollow("post")}
                    >
                      <span>フォロー</span>
                    </Link>
                    <a href="#" className="btn-pk n blue2">
                      <span>支援する</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap_comment">
            <div className="top_comm">
              <div className="imgs">
                {!myProfileImgLoading && (
                  <ImgProfileSpan bgImg={myProfileImgURL}></ImgProfileSpan>
                )}
              </div>
              <IconWithText
                postInfo={currentPost}
                text={{
                  icon: "アイコン",
                  sing_in_to_post: "リアクションする",
                  register: "登録",
                }}
                callback={() => dispatch(getPostReaction({ postId: id, limit: 3 }))}
              />
            </div>
            {/* 댓글 목록 */}
            <div className="lst_comm">
              <ReplyItems isAdd={stateIsAddComent} />
              
              <SeeMoreComent 
                text={{see_more_coment: 'コメントをもっと見る'}}
                meta={currentPost?.reactions?.meta}
                callback={(page) => getComent(page, true)}
                />
            </div>
          </div>

          <div className="detail_botm_slider">
            <PostItems seriesId={currentPost?.seriesId} />
          </div>
        </>
      )}
    </>
  );
};


const ImgProfileSpan = styled.span`
  background-image: url(${(props) => props.bgImg});
`;


const ImgTmpProfileBgDiv = styled.div`
  background-image: url(${(props) => props.bgImg});
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Webtoon;
