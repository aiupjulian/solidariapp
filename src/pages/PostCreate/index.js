import React from 'react';
// import { useHistory } from "react-router-dom";

import PostCreate from './components/index';
// import { useUserState } from "../../contexts/UserContext";
// import { savePost } from "../../utils/firebase";
// import { createSearch, FILTERS } from "../../utils/filters";
// import pages from "../";

const PostCreateContainer = () => {
  // const history = useHistory();
  // const user = useUserState();
  const createPost = (data) => {
    console.log('Submitted: ', data);

    if (data.dateInputType === 'singleDate') {
      data.date = data.date.format('DD/MM/YYYY');
    }
    if (data.dateInputType === 'rangeDate') {
      data.startDate = data.startDate.format('DD/MM/YYYY');
      data.endDate = data.endDate.format('DD/MM/YYYY');
    }
    // savePost(postData, user).then((res) => {
    //   history.push(
    //     pages.Post.path.concat(createSearch({ [FILTERS.ID]: res.id }))
    //   );
    // });
  };

  return <PostCreate />;
};

export default PostCreateContainer;
