import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./PostCreate.css";
import PostCreate from "./components/index";
import { useUserState } from "../../contexts/UserContext";
import { savePost } from "../../utils/firebase";
import { createSearch, FILTERS } from "../../utils/filters";
import pages from "../";
import "./utils/validationLocales";
import postSchema from "./utils/validation";

const getFormData = (form) => {
  const formData = new FormData(form);
  const postData = {};
  formData.forEach((value, key) => {
    postData[key] = value;
  });
  return postData;
};

const getErrors = (errors) =>
  errors.reduce(
    (previousValue, value) => ({
      ...previousValue,
      [value.key]: previousValue[value.key]
        ? previousValue[value.key]
        : value.value,
    }),
    {}
  );

const PostCreateContainer = () => {
  const formElement = useRef();
  const [fieldsErrors, setFieldsErrors] = useState({});
  const history = useHistory();
  const user = useUserState();
  const validate = ({ target, type }) => {
    console.log(target.name);
    console.log(target.value);
    console.log(type);

    if (!target.name || (type === "change" && !fieldsErrors[target.name])) {
      return;
    }
    // LA DATE LLEGA TARDE, llega siempre la anterior
    const postData = getFormData(formElement.current);
    console.log(postData);
    console.log(target.name);

    postSchema
      .validateAt(target.name, postData, { abortEarly: false })
      .then(() => {
        const { [target.name]: _, ...restFieldsErrors } = fieldsErrors;
        setFieldsErrors(restFieldsErrors);
      })
      .catch(({ errors }) => {
        console.log(errors);
        setFieldsErrors({ ...fieldsErrors, ...getErrors(errors) });
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = getFormData(formElement.current);
    postSchema
      .validate(postData, { abortEarly: false })
      .then(() => {
        // savePost(postData, user).then((res) => {
        //   history.push(
        //     pages.Post.path.concat(createSearch({ [FILTERS.ID]: res.id }))
        //   );
        // });
      })
      .catch(({ errors }) => {
        setFieldsErrors(getErrors(errors));
      });
  };
  console.log(fieldsErrors);

  return (
    <form
      ref={formElement}
      className="PostCreateContainer"
      onSubmit={handleSubmit}
      onBlur={validate}
      onChange={validate}
    >
      <PostCreate errors={fieldsErrors} />
    </form>
  );
};

export default PostCreateContainer;
