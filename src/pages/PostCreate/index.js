import React from "react";
// import { useHistory } from "react-router-dom";
import { useForm, FormContext } from "react-hook-form";

import "./PostCreate.css";
import PostCreate from "./components/index";
// import { useUserState } from "../../contexts/UserContext";
// import { savePost } from "../../utils/firebase";
// import { createSearch, FILTERS } from "../../utils/filters";
// import pages from "../";
import "./utils/validationLocales";
import postSchema from "./utils/validation";

const PostCreateContainer = () => {
  const { handleSubmit, ...methods } = useForm({
    validationSchema: postSchema,
  });
  console.log(methods.getValues());

  // const history = useHistory();
  // const user = useUserState();
  const onSubmit = (data) => {
    console.log(data);

    // savePost(postData, user).then((res) => {
    //   history.push(
    //     pages.Post.path.concat(createSearch({ [FILTERS.ID]: res.id }))
    //   );
    // });
  };
  console.log(methods.errors);
  return (
    <FormContext {...methods}>
      <form className="PostCreateContainer" onSubmit={handleSubmit(onSubmit)}>
        <PostCreate />
      </form>
    </FormContext>
  );
};

export default PostCreateContainer;
