import { faCircleCheck, faCommentQuote, faHeart, faShare } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Image from './Image';
import ProfileSpan from './ProfileSpan';

export default function PreviewSeries(props) {
  const { data, text, } = props;

  return (
    <div className="top_detail preview">
      <div className="ar_view">
        <div className="thumb">
          <Image hash={data?.coverImage} alt="" />
        </div>
        <div className="cont">
          <div className="tit">
            <p className="h1">{data?.title}</p>
            <div className="rgh">
              <button type="button" className="btn01">
                <FontAwesomeIcon icon={faHeart} />
                {` ${data?.likeCount}`}
              </button>
              <button type="button" className="btn01">
                <FontAwesomeIcon icon={faCommentQuote} />
                {` ${data?.reactionCount}`}
              </button>
              <button
                type="button"
                className="btn-pk n blue2"
              >
                <FontAwesomeIcon icon={faShare} />
                {text?.preview_share}
              </button>
            </div>
          </div>
          <p className="t1">{data?.description}</p>

          <div className="lst_tag">
            {data?.tags?.map((tag, index) => (
              <div key={`tag_${index}`} className="i_tag">
                #{tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ar_name">
        <div>
          <div className="icon">
            <ProfileSpan hash={data?.author?.profileImage}></ProfileSpan>
          </div>
          <p>{data?.author?.name}</p>
        </div>
        <button type="button" className="btn-pk n blue">
          {text?.preview_surpport}
        </button>
        <button
          type="button"
          className="btn-pk n blue btn_follow"
        >
          <FontAwesomeIcon icon={faCircleCheck} />
          {text?.preview_follow}
        </button>
      </div>
    </div>
  )
}
