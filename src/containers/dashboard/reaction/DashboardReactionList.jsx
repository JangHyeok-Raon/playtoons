import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  checkLoginExpired,
  getDateYYYYMMDD,
  showOneButtonPopup
} from "@/common/common";
import Dropdown from "@/components/dashboard/Dropdown";
import EmptyTr from "@/components/dashboard/EmptyTr";
import Pagination from "@/components/dashboard/MyPagination";
import ReactionButtons from "@/components/dashboard/ReactionButtons";
import { setContainer } from "@/modules/redux/ducks/container";
import {
  getReactionMineAuthorIdFromServer as getReactionMineFromServer
} from "@/services/dashboardService";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const text = {
  page_title: "リアクションリスト",
  post: "投稿する",
  number: "番号",
  content: "内容",
  money: "寄付金",
  user: "作成者",
  date: "掲載日",
  move: "移動",
  fix: "固定",
  good: "いいね",
  coment: "コメント",
  report: "通報",
  delete: "削除",
  empty_message: "リアクションがありません。",
  modal_title: "お知らせ",
  do_u_report: "通報しますか？",
  do_pinned: "固定しました。",
  do_off_pinned: "固定解除しました。",
  do_good: "いいねしました。",
  do_off_good: "いいねをキャンセルしました。",
  do_coment: "コメントしました。",
  do_report: "通報しました。",
  do_delete: "削除しました。",
  can_do_myself: "本人のみ削除可能です。",
  do_you_delete: "削除しますか？",
  cancel: "キャンセル",
  must_register_creator: 'クリエイターとして登録しなければ、ダッシュボードを利用できません。',
};

const searchList = [
  {
    id: "all",
    name: "シリーズすべて",
  },
  {
    id: "pinned",
    name: "固定",
  },
  {
    id: "normal",
    name: "一般",
  },
];

export default function DashboardReactionList() {
  const reduxAuthors = useSelector(({ post }) => post.authorMine.authors);
  const reduxLoginTime = useSelector(({login}) => login?.loginSuccessTime);
  const [statePinnedData, setStatePinnedData] = useState(undefined);
  const [stateData, setStateData] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  //==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container post",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      backTitle: "リアクションリスト",
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);

  //==============================================================================
  // function
  //==============================================================================
  const getList = (flag) => {
    switch(flag){
      default: 
        getPinnedReactionList();
        getReactionList(params.page === undefined ? 1 : params.page);
        return;
      case 'pinned':
        getPinnedReactionList();
        return;
      case 'normal':
        getReactionList(params.page === undefined ? 1 : params.page);
        return;  
    }//switch
  };
  //============================================================================== 
  // api
  //==============================================================================

  const getReactionList = async (pageNumber) => {
    const formData = new FormData();
    if (params.postId === undefined) {
      formData.append("authorId", reduxAuthors[0].id);
    } else {
      formData.append("postId", params.postId);
    }
    formData.append("page", pageNumber);

    const { status, data } = await getReactionMineFromServer(formData);
    if (status === 200) {
      setStateData(data);
    } else {
      showOneButtonPopup(dispatch, String(status + data));
    }
  };

  const getPinnedReactionList = async () => {
    const formData = new FormData();
    if (params.postId === undefined) {
      formData.append("authorId", reduxAuthors[0].id);
    } else {
      formData.append("postId", params.postId);
    }
    formData.append("pinned", true);

    const { status, data } = await getReactionMineFromServer(formData);
    if (status === 200) {
      setStatePinnedData(data);
    } else {
      showOneButtonPopup(dispatch, String(status + data));
    }
  };

  //==============================================================================
  // event
  //==============================================================================
  const handleClickSearch = (item) => {
    setStatePinnedData(undefined);
    setStateData(undefined);
    getList(item?.id);
  };
  //==============================================================================
  // hook & render
  //==============================================================================

  const renderReactionListElements = () => {
    if (
      stateData?.reactions?.length === 0 &&
      statePinnedData?.reactions?.length === 0
    ) {
      return <EmptyTr text={text.empty_message} />;
    }

    return stateData?.reactions?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_subject2">{item.content}</td>
          <td className="td_txt2">
            <span className="view-m">{text.user}</span>
            {reduxAuthors[0].name}
          </td>
          <td className="td_txt2 mb">
            <span className="view-m">{text.date}：</span>
            {getDateYYYYMMDD(item.createdAt, '/')}
          </td>
          <td className="td_txt">
            <span className="view-m">{text.money}</span>
            {item.amount}
          </td>
          <td className="td_btns2">
            <ReactionButtons
              text={text}
              item={item}
              callback={() => getList()}
            />
          </td>
        </tr>
      );
    });
  };

  const renderPinnedReactionListElements = () => {
    return statePinnedData?.reactions?.map((item, index) => {
      return (
        <tr key={index} id={item.id}>
          <td className="hide-m">{item.id}</td>
          <td className="td_subject2">{item.content}</td>
          <td className="td_txt2">
            <span className="view-m">{text.user}</span>
            {reduxAuthors[0].name}
          </td>
          <td className="td_txt2 mb">
            <span className="view-m">{text.date}：</span>
            {getDateYYYYMMDD(item.createdAt, '/')}
          </td>
          <td className="td_txt">
            <span className="view-m">{text.money}</span>
            {item.amount}
          </td>
          <td className="td_btns2">
            <ReactionButtons
              text={text}
              item={item}
              callback={() => getList()}
            />
          </td>
        </tr>
      );
    });
  };

  useLayoutEffect(() => {
    //check login expire time
    if( checkLoginExpired( navigate, dispatch, text.login_expired, reduxLoginTime )){
      //check author
      if( reduxAuthors && reduxAuthors?.length > 0 ){
        getList();
      }
      else{
        showOneButtonPopup( dispatch, text.must_register_creator, () => navigate('/author/register') );
      }
    }
  }, [params]);

  return (
    <div className="contents">
      <div className="inr-c">
        <div className="hd_titbox hd_mst1">
          <h2 className="h_tit0">
            <span>{text.page_title}</span>
          </h2>
          <div className="rgh">
            <Link to="/post/upload" className="btn-pk n blue2">
              <span>
                <FontAwesomeIcon icon={faPlus} /> {text.post}
              </span>
            </Link>
          </div>
        </div>
        <div className="hd_titbox2">
          <Dropdown
            name={"typeId"}
            className={"select1"}
            dataList={searchList}
            handleItemClick={handleClickSearch}
          />
        </div>

        <div className="tbl_basic mtbl_ty1">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid1" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.content}</th>
                <th>{text.user}</th>
                <th>{text.date}</th>
                <th>{text.money}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* pinned list */}
              {renderPinnedReactionListElements()}
              {/* reaction list */}
              {renderReactionListElements()}
            </tbody>
          </table>
        </div>

        {stateData?.reactions?.length > 0 && (
          <Pagination
            className={""}
            meta={stateData?.meta}
            callback={(page) => getReactionList(page)}
          />
        )}
      </div>
    </div>
  );
}
