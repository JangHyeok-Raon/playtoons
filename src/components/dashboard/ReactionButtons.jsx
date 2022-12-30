import { showOneButtonPopup, showPopup, showTwoButtonPopup } from "@/common/common";
import { hideModal } from "@/modules/redux/ducks/modal";
import {
  deleteReactionIdToServer,
  deleteReactionLikeToServer,
  deleteReactionReactionIdPinFromServer as deleteReactionIdPinToServer,
  setPostReactionIdReportToServer,
  setReactionLikeToServer as setReactionIdLikeToServer,
  setReactionReactionIdPinToServer as setReactionIdPinToServer,
} from "@/services/dashboardService";
import { setPostReactionToServer } from "@/services/postService";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReportPopup from "./ReportPopup";

export default function ReactionButtons(props) {
  const { type, text, item, callback } = props;
  const [stateType, setStateType] = useState(type);
  const reduxAuthors = useSelector(({ post }) => post.authorMine.authors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //==============================================================================
  // function
  //==============================================================================
  const checkBeforeToDeleteReaction = (id) => {
    if (reduxAuthors[0].id === item.authorId) {
      showTwoButtonPopup(dispatch, <><div>{id}</div><div>{text.do_you_delete}</div></>, checkPinnedToDeleteReaction);
    } else {
      showOneButtonPopup(dispatch, text.can_do_myself);
    }
  };

  const checkPinnedToDeleteReaction = async () => {
    if (item.pinned) {
      const params = {
        id: item.id,
      };
      const { status, data } = await deleteReactionIdPinToServer(params);
      if (status === 200) {
        deleteReaction();
      } else {
        showOneButtonPopup(dispatch, data);
      }
    }
    else{
      deleteReaction();
    }
  };

  const checkReport = (id) => {
    showPopup(dispatch, '通報', <ReportPopup callback={(type, content) => setReport(type, content)} /> );

    // showTwoButtonPopup(dispatch, <><div>{id}</div><div>{text.do_u_report}</div></>, () => setReport() );
  };

  //==============================================================================
  // api
  //==============================================================================

  const deleteReaction = async () => {
    const { status, data } = await deleteReactionIdToServer(item.id);

    if (status === 200) {
      callback?.();
      dispatch(hideModal());
      showOneButtonPopup(dispatch, text.do_delete);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     report 
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setReport = async (type, content) => {
    let params = {
      type: type,
      content: content,
      // refId: item.postId,
    };

    const { status, data } = await setPostReactionIdReportToServer(item.id, params);

    if (status === 201) {
      callback?.();
      showOneButtonPopup(dispatch, text.do_report);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     코멘트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setComent = async () => {
    let params = {
      content: item.content,
      iconImage: item.iconImage,
      type: "reply",
      postId: item.postId,
      authorId: item.authorId,
      reactionId: item.id,
    };

    const { status, data } = await setPostReactionToServer(params);
    if (status === 201) {
      callback?.();
      showOneButtonPopup(dispatch, text.do_coment);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     좋아요
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setReactionLike = async () => {
    const params = {
      id: item.id,
    };

    const { status, data } = await setReactionIdLikeToServer(params);
    if (status === 201) {
      callback?.();
      // showOneButtonPopup(dispatch, text.do_good);
    } else if (status === 409) {
      //like 취소
      const { status, data } = await deleteReactionLikeToServer(params);
      if (status === 200) {
        showOneButtonPopup(dispatch, text.do_off_good);
      } else {
        showOneButtonPopup(dispatch, data);
      }
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  /**
     고정
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setReactionPin = async () => {
    const params = {
      id: item.id,
    };

    let response = undefined;
    if (item.pinned) {
      response = await deleteReactionIdPinToServer(params);
    } else {
      response = await setReactionIdPinToServer(params);
    }
    const { status, data } = response;

    if (status === 201 || status === 200) {
      // showOneButtonPopup(
      //   dispatch,
      //   item.pinned ? text.do_off_pinned : text.do_pinned
      // );
      callback?.();
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  //==============================================================================
  // event
  //==============================================================================

  const handleButtonClick = (id, menu) => {
    switch (menu) {
      default:
        // move
        navigate(`/dashboard/post/detail/${id}`);
        break;
      case text.fix:
        ///reaction/:reactionId/pin
        setReactionPin();
        break;
      case text.good:
        ///reaction/:reactionId/like
        setReactionLike();
        break;
      case text.coment:
        //POST /reaction 에 reactionId 항목을 해당 리액션의 아이디를 입력
        setComent();
        break;
      case text.report:
        //POST /reaction/:reactionId/report
        checkReport(id);
        break;
      case text.delete:
        //현재는 내가 작성한 댓글에 대해서만 삭제 가능합니다 DELETE /reaction/:reactionId
        checkBeforeToDeleteReaction(id);
        break;
    }
  };

  //==============================================================================
  // hook & render
  //==============================================================================

  useEffect(() => {
    setStateType(type);
  }, [type]);

  return (
    <>
      {/* reaction list */}
      {stateType === undefined && (
        <>
          <div
            onClick={() => handleButtonClick(item.postId, text.move)}
            className="btn-pk s blue2"
          >
            {text.move}
          </div>
          <div
            onClick={() => handleButtonClick(item.id, text.fix)}
            className={`btn-pk s ${item.pinned ? "blue" : "blue2"}`}
          >
            {text.fix}
          </div>
          <div
            onClick={() => handleButtonClick(item.id, text.good)}
            className="btn-pk s blue2"
          >
            {text.good}
          </div>
          <div
            onClick={() => handleButtonClick(item.id, text.coment)}
            className="btn-pk s blue2"
          >
            {text.coment}
          </div>
          <div
            onClick={() => handleButtonClick(item.id, text.report)}
            className="btn-pk s blue2"
          >
            {text.report}
          </div>
          <div
            onClick={() => handleButtonClick(item.id, text.delete)}
            className="btn-pk s blue2"
          >
            {text.delete}
          </div>
        </>
      )}

      {/* post detail */}
      {stateType === "postDetail" && (
        <>
          <div
            className={`btn-pk s ${item.pinned ? "blue" : "blue2"}`}
            onClick={() => handleButtonClick(item.id, text.fix)}
          >
            {text.fix}
          </div>
          <div
            className="btn-pk s blue2"
            onClick={() => handleButtonClick(item.id, text.good)}
          >
            {text.good}
          </div>
          <div
            className="btn-pk s blue2"
            onClick={() => handleButtonClick(item.id, text.coment)}
          >
            {text.coment}
          </div>
          <div
            className="btn-pk s blue2"
            onClick={() => handleButtonClick(item.id, text.report)}
          >
            {text.report}
          </div>
          <div
            className="btn-pk s blue2"
            onClick={() => handleButtonClick(item.id, text.delete)}
          >
            {text.delete}
          </div>
        </>
      )}
    </>
  );
}
