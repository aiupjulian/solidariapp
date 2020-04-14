import React from "react";
import { Heading } from "react-bulma-components";
import { useHistory } from "react-router-dom";

import "./PostCreate.css";
import PostCreate from "./components/index";
import { useUserState } from "../../contexts/UserContext";
import { savePost } from "../../utils/firebase";
import pages from "../";

const PostCreateContainer = () => {
  const history = useHistory();
  const user = useUserState();
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
    savePost(postData, user).then(res => {
      // ver de devolver la info del post para redirigir a ese /post/id
      console.log(res);
      history.push(pages.Post.path);
    });
  };
  return (
    <form className="PostCreateContainer" onSubmit={handleSubmit}>
      <Heading className="PostCreateTitle">Crear publicacion</Heading>
      <PostCreate />
    </form>
  );
};

export default PostCreateContainer;
