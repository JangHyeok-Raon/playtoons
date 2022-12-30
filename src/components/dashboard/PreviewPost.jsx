import { getHtmlElementFromHtmlString } from '@/common/common';
import Image from './Image';
import ImageDiv from './ImageDiv';

export default function PreviewPost(props) {
  const { data, text, } = props;


  const renderEditView = () => {
    return  <div className="editor_p ws_pre">
              {getHtmlElementFromHtmlString(data?.content)}
            </div>
  };

  const renderImage = () => {
    return data?.content?.map((image, index) => {
      return <Image hash={image} key={index} />;
    });
  };

  return (
    <div className="wrap_detail">
      <div className="area_detail2">
        <h2 className="h1">{data?.title}</h2>
        <p className="d1">
          {data?.startAt}
        </p>
        <p className="t1 c-gray">{data?.outline}</p>
      </div>

      <div className="area_webtoon">
        {
          data?.isEditor ? (
              renderEditView()
            ) : (
              renderImage()
            )
        }
      </div>
      {/* 
      <div className="area_detail2">
        <p className="t1 c-gray">
          リヒターさん噂はかねがね、って感じだったけど本当に面白い人だった。ドナースマルク映画のイメージが強いからだいぶ引っ張られてはいたけど、トム・シリングより多弁な人だということが伝わってきた。
        </p>
      </div> */}

      <div className="area_detail3">
        <div className="box_profile">
          <ImageDiv className={'bg'} hash={data?.author?.backgroundImage} />

          <div className="pf_txt">
            <div className="icon">
              <Image hash={data?.author?.profileImage} />
            </div>
            <p className="h1">{data?.author?.nickname}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
