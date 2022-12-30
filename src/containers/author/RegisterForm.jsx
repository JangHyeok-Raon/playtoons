import React, { useRef, useLayoutEffect, useCallback,  } from "react";

import ImageUpload from "@/components/dashboard/ImageUpload";
import ToolTip from "@/components/dashboard/ToolTip";
import Tag from "@/components/dashboard/Tag";
import { getErrorMessageFromResultCode, getFromDataJson, getRatingToChecked, initButtonInStatus, showOneButtonPopup } from "@/common/common";
import {   setFileToServer } from "@/services/dashboardService";
import Input from "@/components/dashboard/Input";
import Textarea from "@/components/dashboard/Textarea";
import { useNavigate } from "react-router-dom";
import { getEulaVersion } from "@/services/accountService";
import { useState } from "react";
import Button from "@/components/dashboard/Button";
import { showModal } from "@/modules/redux/ducks/modal";
import ErrorPopup from "@/components/dashboard/ErrorPopup";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorToServer } from "@/services/authorService";
import { initAuthorAction, setAuthorAction } from "@/modules/redux/ducks/author";
import { useEffect } from "react";
import { setContainer } from "@/modules/redux/ducks/container";
import { getAuthorMineAction } from "@/modules/redux/ducks/post";




const text = {
	register_creator: 'クリエイター登録',
  nickname: "ニックネーム",
  name: "名前",
  introduction: "クリエイターの説明",
  register_profile_image: "プロフィル写真登録",
  register_profile_image_tooltip: "プロファイルとして使用する写真をアップロードしてください。",
  register_cover_image: "カバー写真登録",
  setting_age: "年齢設定",
  setting_tag: "タグ設定",
  setting_tag_tooltip: "タグ入力は、老眼鏡アイコンクリックまたはエンタをご利用ください。",
  tag_name: "タグ名",
  description_policy: "当サイトでは、直近５年間の長崎県公報の全文を掲載しています。",
  register: "登録する",
  drag_n_drop: "ドラッグ＆ドロップ",
	r_19: "R-19",
	input_nickname: 'ニックネームが必要です。',
	input_name: '名前が必要です。',
	input_description: '紹介が必要です。',
	input_profile: 'プロフィル写真が必要です。',
	input_background: 'カバー写真が必要です。',
	done_register: 'クリエイター登録しました。',
};


export default function RegisterForm(props) {
	const [stateAgreement, setStateAgreement] = useState(undefined);
	const reduxAuthorUpload = useSelector(({author}) => author.authorUpload);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const refForm = useRef();
	const refNickname = useRef();
	const refName = useRef();
	const refDescription = useRef();
	const refProfile = useRef();
	const refBackground = useRef();
	const refR19 = useRef();
	const refTags = useRef();
	const refRegister = useRef();

	//==============================================================================
  // header
  //==============================================================================
  const handleContainer = useCallback(() => {
    const container = {
      headerClass: "header",
      containerClass: "container author_main",
      isHeaderShow: true,
      isMenuShow: false,
      headerType: "post",
      menuType: null,
      isDetailView: false,
      activeMenu: null,
      isFooterShow: false,
    };
    dispatch(setContainer(container));
  }, [dispatch]);

	//==============================================================================
	// function
	//==============================================================================

	//==============================================================================
	// api
	//==============================================================================

	const getAgreementInfo = async () => {
		const {status, data} = await getEulaVersion("author");
		console.log('getAgreementInfor', status, data);
		
		if( status === 200 ){
			setStateAgreement(data?.agreement);
		}
		else{
			showOneButtonPopup(dispatch,  data?.data );
		}
	};

	//==============================================================================
	// event
	//==============================================================================
  
	const handleClickRegister = (event) => {
		if( refNickname.current.isEmpty() ){
			initButtonInStatus(refRegister);
			refNickname.current.setError( text.input_nickname );
			return;
		}

		if( refName.current.isEmpty() ){
			initButtonInStatus(refRegister);
			refName.current.setError( text.input_name );
			return;
		}

		if( refDescription.current.isEmpty() ){
			initButtonInStatus(refRegister);
			refDescription.current.setError( text.input_description );
			return;
		}

		if( refProfile.current.checkToEmpty() ){
			initButtonInStatus(refRegister);
      refProfile.current.setError( text.input_profile );
      return false;
    }

		if( refBackground.current.checkToEmpty() ){
			initButtonInStatus(refRegister);
      refBackground.current.setError( text.input_background );
      return false;
    }

		//set author
		let json = getFromDataJson(refForm);
		json = {
			...json,
			fileInfoProfile: refProfile.current.getImageFile(),
      fileInfoBackground: refBackground.current.getImageFile(),
			rating: getRatingToChecked(refR19),
			tagIds: refTags.current.getTagsJsonObject(),
			eulaVersion: stateAgreement?.version
		};

		dispatch( setAuthorAction(json) );
	};

	//==============================================================================
	// Hook & render
	//==============================================================================

  useLayoutEffect(() => {
		handleContainer();
		//get eulaVersion
		getAgreementInfo();
  }, []);

	useEffect(() => {
		if(reduxAuthorUpload){
			initButtonInStatus(refRegister);
      if (reduxAuthorUpload?.status === 201) {
        //success
				dispatch(getAuthorMineAction());
        showOneButtonPopup( dispatch, text.done_register, () => navigate("/dashboard/profile/upload") );
      } else {
        //error 처리
        if (reduxAuthorUpload?.type === "profile") {
          refProfile.current.setError( String(reduxAuthorUpload?.data) );
        } else if (reduxAuthorUpload?.type === "background") {
          refBackground.current.setError( String(reduxAuthorUpload?.data) );
        } else {
          showOneButtonPopup( dispatch, String(reduxAuthorUpload?.data) );
        }
      }
		}

		return () => dispatch( initAuthorAction() );
	}, [reduxAuthorUpload]);

  return (
    <div className="container sub bg" style={{padding: '55px 16px'}}>

				<div className="inr-c">
					<form ref={refForm}>
						<section className="bbs_write">
							<div className="hd_titbox hd_mst1 reg_author">
								<h2 className="h_tit1"><span>{text.register_creator}</span></h2>
							</div>

							<div className="col" >
								<h3 className="tit1">{text.nickname}</h3>
								<Input ref={refNickname} type="text" name='nickname' className="inp_txt w100p"/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.name}</h3>
								<Input ref={refName} type="text" name='name' className="inp_txt w100p"/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.introduction}</h3>
								<Textarea ref={refDescription} name="description" className="textarea1"/>
							</div>


							<div className="col">
								<h3 className="tit1">{text.register_profile_image} <button type="button" className="btn_help" title="ヘルプ">
									<ToolTip
										title={text.register_profile_image}
										text={text.register_profile_image_tooltip} />
								</button></h3>
								<ImageUpload
									ref={refProfile}
									className={"box_drag square"}
									id={"filebox1"}
									name={"profileImage"} 
									/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.register_cover_image}</h3>
								<ImageUpload
									ref={refBackground}
									className={"box_drag"}
									id={"filebox2"}
									name={"backgroundImage"} 
									text={text.drag_n_drop}
									/>
							</div>

							<div className="col">
								<h3 className="tit1">{text.setting_age}</h3>
								<label className="inp_chktx"><input type="checkbox" ref={refR19} /><span>{text.r_19}</span></label>
							</div>

							<div className="col">
								<h3 className="tit1">{text.setting_tag} <button type="button" className="btn_help" title="ヘルプ">
									<ToolTip
										title={text.setting_tag}
										text={text.setting_tag_tooltip} />
									</button>
								</h3>
								<Tag 
									ref={refTags}
									name={"tagIds"}
									className={"inp_txt sch"}
									placeholder={text.tag_name} />
							</div>

							<div className="col">
								<p className="t_info">{text.description_policy}<br className="view-m" /></p>
							</div>
						</section>
					</form>

					<div className="bbs_write_botm">
						<Button ref={refRegister} className={'btn-pk n blue'} text={text.register} onClick={handleClickRegister} />
					</div>
					
				</div>
    </div>
    
  );
}

