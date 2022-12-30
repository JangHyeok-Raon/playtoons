import { useEffect, useRef, useState } from "react";

import { setPostReactionToServer } from "@/services/postService";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { faCircleXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import Image from "./Image";
import SwiperContainer from "./SwiperContainer";

/**
*
  아이콘 댓글 등록창
   <IconWithText 
    text={{
      sing_in_to_post: text.sing_in_to_post,    //placeholder
      icon: text.icon,                          //icon button text
      register: text.register                   //register button text
    }}
    callback={handler}
    />
*
* @version 1.0.0
* @author 2hyunkook
* @param {*} props
* @return
*/
export default function IconWithText(props, ref) {
  const { text, postInfo, callback } = props;
  const [stateIconData, setStateIconData] = useState(undefined);
  const [stateTopSelected, setStateTopSelected] = useState(0);
  const [stateShowIcon, setStateShowIcon] = useState(false);
  const [stateSelectedIcons, setStateSelectedIcons] = useState([]);
  const [stateError, setStateError] = useState(undefined);
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();
  const refContaienr = useRef();
  const refTextArea = useRef();
  const refButton = useRef();

  //==============================================================================
  //  function
  //==============================================================================

  const initStatus = () => {
    setStateTopSelected(0);
    setStateShowIcon(false);
    setStateSelectedIcons([]);
    setStateError(undefined);
    refTextArea.current.value = "";
    refButton.current.setStatus(undefined);
  };

  const isAuthors = () => {
    return reduxAuthors && reduxAuthors?.length > 0;
  };

  //==============================================================================
  //  api
  //==============================================================================

  /**
   * 리액션 작성
   * @version 1.0.0
   * @author 2hyunkook
   */
  const setReaction = async () => {
    let params = {
      content: refTextArea.current.value,
      iconImage:
        stateSelectedIcons.length === 0 ? "" : stateSelectedIcons[0].image,
      type: "reply",
      postId: postInfo.id,
      authorId: isAuthors() ? reduxAuthors[0].id : null,
      // reactionId: "string"
    };

    const { status, data } = await setPostReactionToServer(params);
    if (status === 201) {
      callback?.();
      initStatus();
      // showOneButtonPopup(dispatch, text.register_coment);
    } else {
      setStateError( data );
      refButton.current.setStatus(undefined);
    }
  };

  //==============================================================================
  //  event
  //==============================================================================

  const handleItemDelete = (selectedItem) => {
    setStateSelectedIcons(
      stateSelectedIcons.filter((item) => item.code !== selectedItem.code)
    );

    return false;
  };

  const handleTopIcon = (index) => {
    setStateTopSelected(index);
  };

  const handleItemIcon = (index) => {
    const item = stateIconData?.topIcons[stateTopSelected]?.icons[index];
    // setStateSelectedIcons([...stateSelectedIcons, item]);
    setStateSelectedIcons([item]);
  };

  const handleRegister = (event) => {
    if (!refTextArea.current.value) {
      setStateError(text.please_input_coment);
      refButton.current.setStatus(undefined);
      return false;
    }

    setReaction();
  };

  //==============================================================================
  //  hook & render
  //==============================================================================

  const renderSelectedIconsElement = () => {
    return stateSelectedIcons?.map((item, index) => {
      return (
        <div className="ico_emo" key={index}>
          <span>
            <Image hash={item.image}  />
          </span>
          <button type="button">
            <FontAwesomeIcon
              className="fa-solid fa-circle-xmark"
              icon={faCircleXmark}
              onClick={() => handleItemDelete(item)}
            />
          </button>
        </div>
      );
    });
  };

  const renderTopIconElement = useMemo(() => {
    return stateIconData?.topIcons?.map((item, index) => {
      return (
        <SwiperSlide className="cx swiper-slide" key={index}>
          <Image
            hash={item.image}
            onClick={() => handleTopIcon(index)}
          />
        </SwiperSlide>
      );
    });
  }, [stateIconData]);

  const renderIconElement = () => {
    return stateIconData?.topIcons[stateTopSelected]?.icons?.map(
      (item, index) => {
        return (
          <li key={index}>
            <span>
              <Image
                hash={item.image}
                onClick={() => handleItemIcon(index)}
              />
            </span>
          </li>
        );
      }
    );
  };

  //component did mount
  useEffect(() => {
    setStateIconData(tempData);
  }, []);

  return (
    <>
      <div className="conts">
        <div className={`textarea1 ${stateSelectedIcons.length > 0 && "emo"}`}>
          <textarea
            ref={refTextArea}
            name="content"
            className="textarea1"
            placeholder={text.sing_in_to_post}
            onChange={() => setStateError(undefined)}
            onFocus={() => setStateShowIcon(false)}
          />

          {/* <!-- 삽입된 이모티콘 --> */}
          {stateSelectedIcons.length > 0 && renderSelectedIconsElement()}
        </div>

        {/* button */}
        <div className="btns">
          <button
            type="button"
            className={`btn-pk s ${stateShowIcon ? "blue2" : "gray"}`}
            onClick={() => setStateShowIcon(!stateShowIcon)}
          >
            <span>{text.icon}</span>
          </button>
          <Button
            type="button"
            ref={refButton}
            text={text.register}
            className="btn-pk s blue"
            onClick={handleRegister}
          >
          </Button>
        </div>

        {/* <!-- 이모티콘 삽입 --> */}
        {stateShowIcon && (
          <div
            className="box_emoji"
            style={{ display: "block" }}
            ref={refContaienr}
          >
            <div className="tit_emo">
              <SwiperContainer
                className={"myEmoji1"}
                buttonClassName={"my1 hide-m myem"}
                iconLeft={faAngleLeft}
                iconRight={faAngleRight}
                slidesPerView={8}
                breakpoints={{
                  0: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                  },
                  960: {
                    slidesPerView: 6,
                    spaceBetween: 12,
                  },
                  1400: {
                    slidesPerView: 8,
                    spaceBetween: 16,
                  },
                }}
                list={renderTopIconElement}
              />
            </div>
            <div className="cont_emo scrollY">
              <ul>{renderIconElement()}</ul>
            </div>
          </div>
        )}

        <ErrorMessage error={stateError} />
      </div>
    </>
  );
}

const tempData = {
  topIcons: [
    {
      image: 'src/assets/images/icon10.png',
      icons: [
        {
          code: "icon1",
          image: "src/assets/images/icon2.png",
        },
        {
          code: "icon2",
          image: "src/assets/images/icon3.png",
        },
        {
          code: "icon3",
          image: "src/assets/images/icon4.png",
        },
        {
          code: "icon4",
          image: "src/assets/images/icon5.png",
        },
        {
          code: "icon5",
          image: "src/assets/images/icon6.png",
        },
        {
          code: "icon6",
          image: "src/assets/images/icon7.png",
        },
        {
          code: "icon7",
          image: "src/assets/images/icon8.png",
        },
        {
          code: "icon8",
          image: "src/assets/images/icon9.png",
        },
      ],
    },
    {
      image: 'src/assets/images/icon0.png',
      icons: [
        {
          code: "icon11",
          image: "src/assets/images/icon9.png",
        },
        {
          code: "icon21",
          image: "src/assets/images/icon8.png",
        },
        {
          code: "icon31",
          image: "src/assets/images/icon7.png",
        },
        {
          code: "icon41",
          image: "src/assets/images/icon6.png",
        },
        {
          code: "icon51",
          image: "src/assets/images/icon5.png",
        },
        {
          code: "icon61",
          image: "src/assets/images/icon4.png",
        },
        {
          code: "icon71",
          image: "src/assets/images/icon3.png",
        },
        {
          code: "icon81",
          image: "src/assets/images/icon2.png",
        },
        {
          code: "icon101",
          image: "src/assets/images/icon3.png",
        },
        {
          code: "icon111",
          image: "src/assets/images/icon4.png",
        },
        {
          code: "icon121",
          image: "src/assets/images/icon5.png",
        },
      ],
    },
  ],
};
