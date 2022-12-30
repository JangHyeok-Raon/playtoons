import Page404 from "@/components/Page404";
import Plan from "@/containers/dashboard/plan/DashboardPlan";
import PlanEdit from "@/containers/dashboard/plan/DashboardPlanEdit";
import PlanSubsciber from "@/containers/dashboard/plan/DashboardPlanSubsciber";
import PlanUpload from "@/containers/dashboard/plan/DashboardPlanUpload";
import Product from "@/containers/dashboard/product/DashboardProduct";
import SalesDetail from "@/containers/dashboard/product/DashboardSalesDetail";
import UploadProfile from "@/containers/dashboard/profile/DashboardUploadProfile";
import SeriesEdit from "@/containers/dashboard/series/DashboardSeriesEdit";
import Series from "@/containers/dashboard/series/DashboardSeriesList";
import SeriesUpload from "@/containers/dashboard/series/DashboardSeriesUpload";
import Main from "@CONTAINERS/dashboard/DashboardMain";
import PostDetail from "@CONTAINERS/dashboard/post/DashboardPostDetail";
import PostEdit from "@CONTAINERS/dashboard/post/DashboardPostEdit";
import PostList from "@CONTAINERS/dashboard/post/DashboardPostList";
import PostUpload from "@CONTAINERS/dashboard/post/DashboardPostUpload";
import ReactionList from "@CONTAINERS/dashboard/reaction/DashboardReactionList";
import SeriesDetail from "@CONTAINERS/dashboard/series/DashboardSeriesDetail";
import { Route, Routes } from "react-router-dom";

import { getAuthorMineAction } from '@/modules/redux/ducks/post';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
* Dashboard url 분기 처리
*
* @version 1.0.0
* @author 이현국
*/
export default function Dashboard() {
  const reduxAuthors = useSelector(({post}) => post.authorMine?.authors);
  const dispatch = useDispatch();
  
  useLayoutEffect(() => {
    //get author info
    if( !reduxAuthors || reduxAuthors?.length === 0 ){
      dispatch( getAuthorMineAction() );
    }
  }, []);

  return (
    <>
      <Routes>
        <Route 
          path="/main" 
          element={<Main />} 
        />
        <Route 
          path="/sales/detail" 
          element={<SalesDetail />} 
        />
        <Route 
          path="/sales/detail/:id" 
          element={<SalesDetail />} 
        />
        <Route 
          path="/product/*" 
          element={<Product />} 
        />
        <Route 
          path="/profile/upload" 
          element={<UploadProfile />} 
        />
        <Route 
          path="/series" 
          element={<Series />} 
        />
        <Route 
          path="/series/:page" 
          element={<Series />} 
        />
        <Route
          path="/series/detail/:id/:postPage"
          element={<SeriesDetail />}
        >
        </Route>
        <Route
          path="/series/upload"
          element={<SeriesUpload />}
        />
        <Route
          path="/series/edit/:id"
          element={<SeriesEdit />}
        />
        <Route 
          path="/post" 
          element={<PostList />} 
        />
        <Route 
          path="/post/:page" 
          element={<PostList />} 
        />
        <Route 
          path="/post/:page&:search" 
          element={<PostList />} 
        />
        <Route
          path="/post/detail/:id"
          element={<PostDetail />}
        />
        <Route
          path="/post/edit/:id"
          element={<PostEdit />}
        />
        <Route
          path="/post/upload"
          element={<PostUpload />}
        />
        <Route 
          path="/reaction" 
          element={<ReactionList />} 
        />
        <Route 
          path="/reaction/:page" 
          element={<ReactionList />} 
        />
        <Route 
          path="/reaction/:page&flag" 
          element={<ReactionList />} 
        />
        <Route 
          path="/reaction/detail/:postId/:page" 
          element={<ReactionList />} 
        />
        <Route 
          path="/plan" 
          element={<Plan />} 
        />
        <Route 
          path="/plan/upload" 
          element={<PlanUpload />} 
        />
        <Route 
          path="/plan/edit/:id" 
          element={<PlanEdit />} 
        />
        <Route 
          path="/plan/subscriber" 
          element={<PlanSubsciber />} 
        />
        <Route 
          path="/plan/subscriber/:page" 
          element={<PlanSubsciber />} 
        />
        <Route 
          path="/*" 
          element={<Page404 />}   
        />
      </Routes>
      
      
    </>
  )
}
