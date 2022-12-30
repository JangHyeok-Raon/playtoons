import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { deleteAccount } from "@API/accountService";
import { logoutRequest } from "@/modules/redux/ducks/login";
import { useDispatch } from "react-redux";

const Close = () => {
  const isLogined = useSelector(({ login }) => login.isLogined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [isErrorShow, setIsErrorShow] = useState(false);

  useEffect(() => {
    if (!isLogined) {
      // 로그인 된 상태가 아니라면 로그인 페이지로
      navigate("/account", { state: { next: "/account/close" } });
    }
  }, [isLogined, navigate]);

  const handleClose = useCallback(async () => {
    if (!agree) {
      setIsErrorShow(true);
    } else {
      const response = await deleteAccount();

      const { status } = response;
      if (status === 200) {
        dispatch(logoutRequest());
        navigate("/");
      } else if (status === 404) {
        alert("존재하지 않는 계정");
      } else if (status === 503) {
        alert("코드 참조");
      }
    }
  }, [agree, navigate, dispatch]);

  return (
    <>
      <h1 className="logo">退会の案内</h1>
      <button className="btn_close">
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="area_terms">
        <div className="in">
          <p className="c-black">1. 定義</p>
          本規約では、以下の用語を使用します。 1.1.
          「コンテンツ」とは、文章、音声、音楽、画像、動画、ソフトウェア、プログラム、コードその他の情報のことをいいます。
          1.2.
          「本コンテンツ」とは、本サービスを通じてアクセスすることができるコンテンツのことをいいます。
          1.3.
          「投稿コンテンツ」とは、お客様が本サービスに投稿、送信、アップロードしたコンテンツのことをいいます。
          1.4.
          「コイン」とは、本サービスにおいて有償で提供されるサービスまたはコンテンツと交換可能な前払式支払手段およびこれに類するもののことをいいます。
          1.5.
          「個別利用条件」とは、本サービスに関して、本規約とは別に「規約」、「ガイドライン」、「ポリシー」等の名称で当社が配布または掲示している条件のことをいいます。
          <p className="c-black">2. 規約への同意</p>
          2.1.
          お客様は、本規約の定めに従って本サービスを利用しなければなりません。お客様は、本規約に同意をしない限り本サービスを利用できません。
          2.2.
          お客様が未成年者である場合は、親権者等の法定代理人の同意を得たうえで本サービスを利用してください。また、お客様が本サービスを事業者のために利用する場合は、当該事業者も本規約に同意したうえで本サービスを利用してください。
          2.3.
          本サービスにおいて個別利用条件がある場合、お客様は、本規約のほか個別利用条件の定めにも従って本サービスを利用しなければなりません。
          <p className="c-black">3. 規約の変更</p>
          当社は、当社が必要と判断する場合、本サービスの目的の範囲内で、本規約を変更することができます。その場合、当社は、変更後の本規約の内容および効力発生日を、本サービスもしくは当社ウェブサイトに表示し、または当社が定める方法によりお客様に通知することでお客様に周知します。変更後の本規約は、効力発生日から効力を生じるものとします。
          <p className="c-black">4. アカウント</p>
          4.1.
          本サービスの利用に際して、情報を登録のうえ、アカウントの作成が必要となる場合があります。この場合、お客様は、真実、正確かつ完全な情報を登録しなければならず、常に最新の情報となるよう修正しなければなりません。
          4.2.
          お客様は、本サービスの利用に際して認証情報を登録する場合、これを不正に利用されないようご自身の責任で厳重に管理しなければなりません。当社は、登録された認証情報を利用して行われた一切の行為を、お客様ご本人の行為とみなすことができます。
          4.3.
          本サービスに登録したお客様は、いつでもアカウントを削除して退会することができます。
          4.4.
          当社は、最終のアクセスから１年間以上経過しているアカウントを、あらかじめお客様に通知することなく削除することができます。
          4.5.
          お客様の本サービスにおけるすべての利用権は、理由を問わず、アカウントが削除された時点で消滅します。お客様が誤ってアカウントを削除した場合であっても、アカウントの復旧はできませんのでご注意ください。
          4.6.
          本サービスのアカウントは、お客様に一身専属的に帰属します。お客様の本サービスにおけるすべての利用権は、第三者に譲渡、貸与その他の処分または相続させることはできません。
        </div>
      </div>

      <div className={`${isErrorShow && !agree ? "error" : ""} inps`}>
        <label className="inp_checkbox">
          <input type="checkbox" onChange={(e) => setAgree(e.target.checked)} />
          <span>クリエイターになる</span>
        </label>

        {isErrorShow && !agree && (
          <p className="t_error">
            <span className="ico_error">必須項目をチェックしてください。</span>
          </p>
        )}
      </div>

      <div className="botm">
        <button type="submit" className="btn-pk mem blue" onClick={handleClose}>
          <span>退会する</span>
        </button>
      </div>
    </>
  );
};

export default Close;
