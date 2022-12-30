import Container from "@COMPONENTS/Container";
import ModalContainer from "@COMPONENTS/ModalContainer";
import Page404 from "@COMPONENTS/Page404";
import ScrollToTop from "@COMPONENTS/ScrollToTop";
import Account from "@CONTAINERS/account/Account";
import Author from "@CONTAINERS/author";
import Dashboard from "@CONTAINERS/dashboard/Dashboard";
import Home from "@CONTAINERS/home";
import LandingPage from "@CONTAINERS/landing";
import Mypage from "@CONTAINERS/mypage";
import Novel from "@CONTAINERS/novel/Novel";
import Payment from "@CONTAINERS/payment";
import Post from "@CONTAINERS/post";
import Product from "@CONTAINERS/product";
import Search from "@CONTAINERS/search";
import Store from "@CONTAINERS/store";
import Timeline from "@CONTAINERS/timeline";
import Webtoon from "@CONTAINERS/webtoon/Webtoon";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <ScrollToTop />
      <Container>
        <Routes>
          <Route path="/*" element={<Page404 />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/webtoon/*" element={<Webtoon />} />
          <Route path="/novel/*" element={<Novel />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/post/*" element={<Post />} />
          <Route path="/author/*" element={<Author />} />
          <Route path="/store/*" element={<Store />} />
          <Route path="/payment/*" element={<Payment />} />
          <Route path="/product/*" element={<Product />} />
          <Route path="/mypage/*" element={<Mypage />} />
          <Route path="/search/*" element={<Search />} />
          <Route path="/timeline/*" element={<Timeline />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Container>
      <ModalContainer />
    </>
  );
}

export default App;
