import { getDateYYYYMMDD, showOneButtonPopup } from "@/common/common";
import Button from "@/components/dashboard/Button";
import EmptyTr from "@/components/dashboard/EmptyTr";
import Image from "@/components/dashboard/Image";
import Pagination from "@/components/dashboard/MyPagination";
import Search from "@/components/dashboard/Search";
import {
  editShopProductToServer,
  getProductListFromServer,
} from "@/services/dashboardService";
import tempImg1 from "@IMAGES/temp_seller_image.png";
import { cloneDeep } from "lodash";
import { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const text = {
  see_product: "商品一覧",
  sales_detail: "販売内訳",
  qna_product: "商品のお問い合せ",
  see_review: "レビュ一覧",
  product_name: "商品名",
  number: "番号",
  product: "商品",
  title: "タイトル",
  price: "価格",
  date: "販売開始日",
  status: "状態",
  detail: "詳細",
  modify: "修正",
  category: "カテゴリ",
  dont_see: "非表示",
  must_register_creator:
    "クリエイターとして登録しなければ、ダッシュボードを利用できません。",
  empty_message: "商品がありません。",
  status_sales: "販売中",
  status_check: "審査中",
  status_not_for_sale: "販売不可",
};

const tempData = {
  meta: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 3,
  },
  products: [
    {
      id: 23,
      thumbnailImage: tempImg1,
      name: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      startAt: "2022/06/11",
      status: "enabled",
    },
    {
      id: 1,
      thumbnailImage: tempImg1,
      name: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      startAt: "2022/06/11",
      status: "enabled",
    },
    {
      id: 3,
      thumbnailImage: tempImg1,
      name: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      startAt: "2022/06/11",
      status: "pending",
    },
    {
      id: 4,
      thumbnailImage: tempImg1,
      name: "大学のリンゴ一個の重さで10メートルの素材",
      price: "1200000CP",
      startAt: "2022/06/11",
      status: "suspended",
    },
  ],
};

export default function DashboardProductList(props) {
  const [stateData, setStateData] = useState(undefined);
  const [stateKeyword, setStateKeyword] = useState(undefined);
  const reduxAuthors = useSelector(({ post }) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //==============================================================================
  // function
  //==============================================================================
  const getStatusColor = (status) => {
    let className = "";

    switch (status) {
      default:
        className = "cl-sell";
        break;
      case "pending":
        className = "cl-ing";
        break;
      case "suspended":
        className = "cl-non";
        break;
    } //switch

    return className;
  };

  const getStatusText = (status) => {
    let statusText = "";

    switch (status) {
      default:
        statusText = text.status_sales;
        break;
      case "pending":
        statusText = text.status_check;
        break;
      case "suspended":
        statusText = text.status_not_for_sale;
        break;
    } //switch

    return statusText;
  };
  //==============================================================================
  // api
  //==============================================================================
  const getProductList = async (keyword, page) => {
    const formData = new FormData();
    formData.append("authorId", reduxAuthors[0].id);
    if (keyword !== undefined) {
      formData.append("keyword", keyword);
    }
    if (page !== undefined) {
      formData.append("page", page);
    }

    // const {status, data} = await getAuthorIdFromServer(formData);
    const { status, data } = await getProductListFromServer(formData);
    console.log("getProductList", status, data);

    if (status === 200) {
      setStateData(data);
    } else {
      showOneButtonPopup(dispatch, data);
    }
  };

  const editProductInStatus = async (item, ftnSetButtonStatus) => {
    console.log("first", item);
    const { status, data } = await editShopProductToServer(item);
    console.log("editProductInStatus", status, data);

    if (status === 200) {
    } else {
      showOneButtonPopup(dispatch, data);
    }

    ftnSetButtonStatus(undefined);
  };

  //==============================================================================
  // event
  //==============================================================================
  /**
     키워드 검색
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleSearch = useCallback((keyword) => {
    setStateKeyword(keyword);
    getProductList(keyword);
  }, []);

  /**
     비표시 이벤트
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleItemClick = useCallback((item, ftnSetButtonStatus) => {
    // productId, name
    let lodashItem = cloneDeep(item);
    lodashItem.status = "pending";
    editProductInStatus(lodashItem, ftnSetButtonStatus);
  }, []);

  //==============================================================================
  // hook & render
  //==============================================================================
  const renderProductList = () => {
    if (stateData?.products?.length === 0) {
      return <EmptyTr text={text.empty_message} />;
    }

    return stateData?.products?.map((item, index) => {
      return (
        <tr key={index}>
          <td className="hide-m">{item.id}</td>
          <td className="td_imgs2">
            <div className="cx_thumb ">
              <span>
                <Image hash={item.thumbnailImage} />
              </span>
            </div>
          </td>
          <td className="td_subject">{item.name || "name"}</td>
          <td className="td_number3">{`${Number(item.price)} PC`}</td>
          <td className="td_txt1">
            <span className="view-m">{text.date}：</span>
            {getDateYYYYMMDD(item.startAt, "/")}
          </td>
          <td className={`td_txt3 cl-sell ${getStatusColor(item.status)}`}>
            <span className="view-m">{text.status}</span>
            {getStatusText(item.status)}
          </td>
          <td className="td_btns2 ty1">
            <Link
              className="btn-pk s blue2"
              to={`/dashboard/product/detail/${item.id}`}
            >
              {text.detail}
            </Link>
            <Link className="btn-pk s blue2" to={`/product/edit/${item.id}`}>
              {text.modify}
            </Link>
            <Button
              className="btn-pk s blue2"
              onClick={(e, ftnSetButtonStatus) =>
                handleItemClick(item, ftnSetButtonStatus)
              }
            >
              {text.dont_see}
            </Button>
          </td>
        </tr>
      );
    });
  };

  useLayoutEffect(() => {
    //check author
    if (reduxAuthors && reduxAuthors?.length > 0) {
      getProductList();
    } else {
      showOneButtonPopup(dispatch, text.must_register_creator, () =>
        navigate("/author/register")
      );
    }
  }, []);

  return (
    <>
      <div className="inr-c">
        <div className="hd_titbox2">
          <Search
            className={"inp_txt sch"}
            placeholder={text.product_name}
            onClick={handleSearch}
          />
        </div>

        <div className="tbl_basic mtbl_ty1 product">
          <table className="list">
            <caption>list</caption>
            <colgroup>
              <col className="num" />
              <col className="imgs2" />
              <col className="" />
              <col className="wid2" />
              <col className="wid4" />
              <col className="wid4" />
              <col className="wid4" />
            </colgroup>
            <thead>
              <tr>
                <th className="hide-m">{text.number}</th>
                <th>{text.product}</th>
                <th>{text.title}</th>
                <th>{text.price}</th>
                <th>{text.date}</th>
                <th>{text.status}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderProductList()}</tbody>
          </table>
        </div>

        <Pagination
          meta={stateData?.meta}
          callback={(page) => getProductList(stateKeyword, page)}
        />
      </div>
    </>
  );
}
