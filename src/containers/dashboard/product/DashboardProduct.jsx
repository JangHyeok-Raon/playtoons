import { useCallback, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import MenuTabs from '@/components/dashboard/MenuTabs';
import Page404 from "@/components/Page404";
import { setContainer } from '@/modules/redux/ducks/container';
import ProductList from "@CONTAINERS/dashboard/product/DashboardProductList";
import SalesInquiry from "@CONTAINERS/dashboard/product/DashboardSalesInquiry";
import SalesList from "@CONTAINERS/dashboard/product/DashboardSalesList";
import SalesReview from "@CONTAINERS/dashboard/product/DashboardSalesReview";
import { useDispatch } from 'react-redux';


const TEXT = {
  see_product : '商品一覧',
  sales_list : '販売内訳',
  product_qna : '商品のお問い合せ',
  see_review : 'レビュ一覧',
};

const tabMenu = [
  {
    name: TEXT.see_product,
    path: "/dashboard/product",
  },
  {
    name: TEXT.sales_list,
    path: "/dashboard/product/sales/list",
  },
  {
    name: TEXT.product_qna,
    path: "/dashboard/product/sales/inquiry",
  },
  {
    name: TEXT.see_review,
    path: "/dashboard/product/sales/review",
  },
];


export default function DashboardProduct() {
  const dispatch = useDispatch();

  //==============================================================================
  // header
  //==============================================================================

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container dashboard typ1",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: null,
      menuType: "DASHBOARD",
      isDetailView: false,
      activeMenu: "product",
    };
    dispatch(setContainer(header));
  }, [dispatch]);

  //==============================================================================
  // hook & render
  //==============================================================================
  useLayoutEffect(() => {
    handleContainer();
  }, []);

  return (
    <div className='contents'>

      <MenuTabs tabMenu={tabMenu} />

      <Routes>    
        <Route 
          index 
          element={<ProductList />} 
        />
        <Route 
          path="/:page" 
          element={<ProductList />} 
        />
        <Route 
          path="/sales/list" 
          element={<SalesList />} 
        />
        <Route 
          path="/sales/list/:page" 
          element={<SalesList />} 
        />
        <Route 
          path="/sales/inquiry" 
          element={<SalesInquiry />} 
        />
        <Route 
          path="/sales/inquiry/:page" 
          element={<SalesInquiry />} 
        />
        <Route 
          path="/sales/inquiry/:page/:id" 
          element={<SalesInquiry />} 
        />
        <Route 
          path="/sales/review" 
          element={<SalesReview />} 
        />
        <Route 
          path="/sales/review/:page" 
          element={<SalesReview />} 
        />
        <Route 
          path="/sales/review/:page/:id" 
          element={<SalesReview />} 
        />

        <Route 
          path="/*" 
          element={<Page404 />}    
        />
      </Routes>
    </div>
  )
}

