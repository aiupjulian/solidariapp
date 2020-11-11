import React from 'react';
// import { useHistory } from "react-router-dom";
import {useForm, FormProvider} from 'react-hook-form';
import moment from 'moment';
import styled from 'styled-components';

import PostCreate from './components/index';
// import { useUserState } from "../../contexts/UserContext";
// import { savePost } from "../../utils/firebase";
// import { createSearch, FILTERS } from "../../utils/filters";
// import pages from "../";
import './utils/validationLocales';
import postSchema from './utils/validation';

const StyledForm = styled.form`
  ${({theme}) => theme.mediaQueries.md} {
    width: 500px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    margin: 0 auto;
    padding: 32px;
    border-radius: 3px;
  }
`;

const PostCreateContainer = () => {
  const {handleSubmit, ...methods} = useForm({
    validationSchema: postSchema,
  });
  console.log(methods.getValues());

  // const history = useHistory();
  // const user = useUserState();
  const onSubmit = (data) => {
    console.log(data);

    if (data.dateInputType === 'singleDate') {
      data.date = data.date.format('DD/MM/YYYY');
    }
    if (data.dateInputType === 'rangeDate') {
      data.startDate = data.startDate.format('DD/MM/YYYY');
      data.endDate = data.endDate.format('DD/MM/YYYY');
    }
    console.log(data);
    // savePost(postData, user).then((res) => {
    //   history.push(
    //     pages.Post.path.concat(createSearch({ [FILTERS.ID]: res.id }))
    //   );
    // });
  };
  console.log(methods.errors);
  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <PostCreate />
      </StyledForm>
    </FormProvider>
  );
};

export default PostCreateContainer;
