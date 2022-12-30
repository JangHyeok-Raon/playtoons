import { showOneButtonPopup } from '@/common/common';
import { getPostListFromServer } from '@/services/dashboardService';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwiperSlide } from "swiper/react";
import Image from '../dashboard/Image';
import SwiperContainer from '../dashboard/SwiperContainer';

export default function PostItems(props) {
  const { seriesId } = props;
  const [ statePosts, setStatePosts ] = useState(undefined);
  const dispatch = useDispatch();

  const getPosts = async () => {
    const formData = new FormData();//get url 
    if( seriesId ) { formData.append('seriesId', seriesId); }
    
    const {status, data} = await getPostListFromServer(formData);
    console.log('getPosts', status, data);
    
    if( status === 200 ){
      setStatePosts(data);
    }
    else{
      showOneButtonPopup(dispatch, data);
    }
  };
  
  const renderPosts = useMemo(() => {
    return statePosts?.posts?.map((item, index) => {
      return <SwiperSlide
              className="box_vslide swiper-slide"
              style={{
                width: "316.5px",
                marginRight: "27px",
              }}
              key={index}
            >
              <Link to={`/post/detail/${item?.type?.code}/${item.id}`}>
                <Image className="thumb" hash={item.thumbnailImage} />
                <div className="txt">
                  <p className="h1">{item.title}</p>
                  <p className="t1">{item.number || 'null'} 話</p>
                  <p className="t2">{item.outline}</p>
                </div>
              </Link>
            </SwiperSlide>
    });
  }, [statePosts]);

  useEffect(() => {
    getPosts();
  }, [seriesId]);

  return (
    <>
      {
        statePosts?.posts && statePosts?.posts?.length > 0 && 
          <div className="slider">
            <SwiperContainer
              className={"mySwiper1"}
              buttonClassName={"my1"}
              slidesPerView={2}
              touchRatio={0}
              list={renderPosts} />
          </div>
      }
    </>
  )
}