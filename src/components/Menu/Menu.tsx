// Menu.jsx
import React from "react";
import { Menu as AntdMenu } from "antd";
import "./Menu.css";
import { Link } from "react-router-dom";
function Menu():JSX.Element {
  const menuItems = [
    { title: "Главная", path: "/" },
    { title: "Посты", path: "posts" },
    { title: "Фотографии", path: "photos" },
    { title: "Контакты", path: "contacts" },
  ];
  return (
    <div>
      <AntdMenu className="menu">
        {menuItems.map((item:{title:string, path: string}, key:number) => (
          <AntdMenu.Item key={key}>
            <Link to={item.path}>{item.title}</Link>
          </AntdMenu.Item>
        ))}
      </AntdMenu>
    </div>
  );
}

export default Menu;
