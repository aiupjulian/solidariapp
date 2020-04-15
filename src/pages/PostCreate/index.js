import React from "react";
import { Heading } from "react-bulma-components";
import { useHistory } from "react-router-dom";

import "./PostCreate.css";
import PostCreate from "./components/index";
import { useUserState } from "../../contexts/UserContext";
import { savePost } from "../../utils/firebase";
import { createSearch, FILTERS } from "../../utils/filters";
import pages from "../";

const PostCreateContainer = () => {
  const history = useHistory();
  const user = useUserState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
    savePost(postData, user).then((res) => {
      history.push(
        pages.Post.path.concat(createSearch({ [FILTERS.ID]: res.id }))
      );
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
