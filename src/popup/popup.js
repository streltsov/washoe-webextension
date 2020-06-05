import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Store } from "webext-redux";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddWord from "./AddWord";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddIcon from "@material-ui/icons/Add";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function Popup () {
  const { isLoggedIn } = useSelector(x => x);
  const [ view, setView ] = useState("menu");

  const Menu = () => (
    <React.Fragment>
      <MenuItem onClick={() => setView("add-word")}><AddIcon />Add word</MenuItem>
      <MenuItem>Logout</MenuItem>
    </React.Fragment>
  );

  const switcher = {
    menu: <Menu />,
    "add-word": <AddWord />
  };

  return (
    <div>
      { Boolean(view != "menu") && <MenuItem onClick={() => setView("menu")}><ArrowBackIosIcon />Back</MenuItem> }
      { switcher[view] }
    </div>
  );
};

const store = new Store();

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Popup />
    </Provider>
    , document.getElementById("root"));
});
