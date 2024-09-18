import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Contacts from "./Contacts";
import PostList from "./Posts/PostList";
import Header from "./Header/Header";
import { Layout } from "antd";
import Menu from "./Menu/Menu";
import Sider from "antd/es/layout/Sider";
import Footer from "./Footer/Footer";
import CreatePost from "./CreatePost/CreatePost";
import LogIn from "./Auth/LogIn";
import NotFound from "./NotFound";
import PhotoList from "./PhotoList/PhotoList";
import Photo from "./Photo/Photo";
import User from "./User/User";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import CreateComment from "./CreateComment/CreateComment";
import Registration from "./Auth/Registration";
import Post from "./Post/Post";
function Root() {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider className={"ant-layout-sider-light"}>
          <Menu />
        </Sider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path=":id" element={<Post />} />
          </Route>
          <Route path="photos">
            <Route index element={<PhotoList />} />
            <Route path=":id" element={<Photo />} />
          </Route>
          <Route path="contacts" element={<Contacts />} />
          <Route path="logIn" element={<LogIn />} />
          <Route path="registration" element={<Registration />} />
          <Route element={<PrivateRoute />}>
            <Route path="new" element={<CreatePost />} />
            <Route path="createComment/:id" element={<CreateComment />} />
            <Route path="user" element={<User />} />
          </Route>
        </Routes>
      </Layout>
      <Footer />
    </Layout>
  );
}
export default Root;
