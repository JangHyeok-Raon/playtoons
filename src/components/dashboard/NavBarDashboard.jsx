import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { showModal } from "@/modules/redux/ducks/modal";
import NavBarItem from "@COMPONENTS/dashboard/NavBarItem";

//==============================================================================
import {
  faTableColumns as iconDashboard,
  faDiamond as iconProduct,
  faUser as iconProfile,
  faObjectUnion as iconSeries,
  faSquarePen as iconPost,
  faSeal as iconPlan,
  faChartLine as iconAnalysis,
} from "@fortawesome/pro-light-svg-icons";

import { faTableColumns as iconDashboardOn } from "@fortawesome/pro-regular-svg-icons";
import {
  faDiamond as iconProductOn,
  faUser as iconProfileOn,
  faObjectUnion as iconSeriesOn,
  faSquarePen as iconPostOn,
  faSeal as iconPlanOn,
  faChartLine as iconAnalysisOn,
} from "@fortawesome/pro-solid-svg-icons";
//==============================================================================

let textData = {
  dashboard: "ダッシュボード",
  plan_management: "支援管理",
  post_management: "投稿管理",
  series_management: "シリーズ管理",
  profile_management: "プロフィル管理",
  product: "商品",
  analysis: "分析",
};

const DASHBOARD_PATH = {
  PLAN: "/dashboard/plan",
  PRODUCT: "/dashboard/product",
  SERIES: "/dashboard/series",
  POST: "/dashboard/post",
  PROFILE: "/dashboard/profile/upload",
  DASHBOARD: "/dashboard/main",
  ANALYSIS: "/dashboard/analysis",
};

export default function NavBarDashboard(props) {
  const { type, className } = props;

  const getExtraNav = () => {
    switch (type) {
      default:
        break;
      case "post_detail":
        return (
          // iconAnalysis
          <NavBarItem
            text={textData.analysis}
            path={DASHBOARD_PATH.ANALYSIS}
            icon={iconAnalysis}
            selectedIcon={iconAnalysisOn}
          />
        );
    }
  };

  return (
    <aside className={`sidebar ${className}`}>
      <h2 className="tit">{textData.dashboard}</h2>
      <nav className="menu">
        <ul>
          <NavBarItem
            text={textData.dashboard}
            path={DASHBOARD_PATH.DASHBOARD}
            icon={iconDashboard}
            selectedIcon={iconDashboardOn}
          />
          <NavBarItem
            text={textData.product}
            path={DASHBOARD_PATH.PRODUCT}
            icon={iconProduct}
            selectedIcon={iconProductOn}
          />
          <NavBarItem
            text={textData.profile_management}
            path={DASHBOARD_PATH.PROFILE}
            icon={iconProfile}
            selectedIcon={iconProfileOn}
          />
          <NavBarItem
            text={textData.series_management}
            path={DASHBOARD_PATH.SERIES}
            icon={iconSeries}
            selectedIcon={iconSeriesOn}
          />
          <NavBarItem
            text={textData.post_management}
            path={DASHBOARD_PATH.POST}
            icon={iconPost}
            selectedIcon={iconPostOn}
          />
          <NavBarItem
            text={textData.plan_management}
            path={DASHBOARD_PATH.PLAN}
            icon={iconPlan}
            selectedIcon={iconPlanOn}
          />
          {getExtraNav()}
        </ul>
      </nav>
    </aside>
  );
}
