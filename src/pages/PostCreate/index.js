import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

import "./PostCreate.css";
import PostCreate from "./components/index";
import { useUserState } from "../../contexts/UserContext";
import { savePost } from "../../utils/firebase";
import { createSearch, FILTERS } from "../../utils/filters";
import pages from "../";
import "./validationLocales";

function validationReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALIDATION_ERROR": {
      return {
        ...state,
        [action.payload.fieldName]: action.payload.fieldErrorMessage,
      };
    }
    case "SET_FIELDS_VALIDATION_ERRORS": {
      return action.payload;
    }
    case "CLEAR_FIELD_VALIDATION_ERROR": {
      const { [action.payload]: _, ...rest } = state;
      return rest;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const postSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(5)
    .max(20),
  description: yup
    .string()
    .required()
    .min(5)
    .max(100),
});

const PostCreateContainer = () => {
  const [validationState, dispatch] = useReducer(validationReducer, {});
  const history = useHistory();
  const user = useUserState();
  const validate = ({ target, type }) => {
    if (type === "change" && !validationState[target.name]) {
      return;
    }
    postSchema
      .validateAt(
        target.name,
        { [target.name]: target.value },
        { abortEarly: false }
      )
      .then(() => {
        dispatch({
          type: "CLEAR_FIELD_VALIDATION_ERROR",
          payload: target.name,
        });
      })
      .catch(({ errors }) => {
        dispatch({
          type: "SET_FIELD_VALIDATION_ERROR",
          payload: {
            fieldName: target.name,
            fieldErrorMessage: errors[0].value,
          },
        });
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = {};
    formData.forEach((value, key) => {
      postData[key] = value;
    });
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
        dispatch({
          type: "SET_FIELDS_VALIDATION_ERRORS",
          payload: errors.reduce(
            (previousValue, value) => ({
              ...previousValue,
              [value.key]: previousValue[value.key]
                ? previousValue[value.key]
                : value.value,
            }),
            {}
          ),
        });
      });
  };
  console.log(validationState);

  return (
    <form
      className="PostCreateContainer"
      onSubmit={handleSubmit}
      onBlur={validate}
      onChange={validate}
    >
      <PostCreate errors={validationState} />
    </form>
  );
};

export default PostCreateContainer;
