import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import pages from '../../';
import {FILTERS} from '../../../utils/filters';
import useQuery from '../../../hooks/useQuery';

const KeywordInput = () => {
  const query = useQuery();
  const keywords = query.get(FILTERS.KEYWORDS);
  const [keywordsInput, setKeywordsInput] = useState(keywords || '');
  const history = useHistory();

  const handleKeywordClick = () => {
    query.delete(FILTERS.KEYWORDS);
    if (keywords) {
      setKeywordsInput('');
    } else if (keywordsInput !== '') {
      query.append(FILTERS.KEYWORDS, keywordsInput);
    }
    history.push(pages.PostList.path.concat('?', query.toString()));
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="keywords-input">Palabras clave</InputLabel>
      <OutlinedInput
        id="keywords-input"
        label="Palabras clave"
        value={keywordsInput}
        onChange={(event) => setKeywordsInput(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && handleKeywordClick()}
        disabled={!!keywords}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleKeywordClick} edge="end">
              {keywords ? <ClearIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default KeywordInput;
