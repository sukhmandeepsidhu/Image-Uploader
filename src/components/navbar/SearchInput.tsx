import React,{ChangeEvent} from 'react';
import './searchInputStyles.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AiOutlineReload } from 'react-icons/ai';

interface SearchInputProps{
  onSubmit: (searchText:string) => Promise<void>;
  placeholder: string;
}

const SearchInput = (props:SearchInputProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const { onSubmit, placeholder } = props;
  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit(searchText);
    setSearchText('');
  };

  return (
    <Form.Group className='searchBox'>
      <Button
        onClick={() => {
          onSubmit('');
        }}
        variant='light'
      >
        <AiOutlineReload />
      </Button>
      <Form.Control
        type='text'
        value={searchText}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <Button
        onClick={handleSubmit}
        variant='light'
        disabled={searchText.length < 1}
      >
        Go
      </Button>
    </Form.Group>
  );
};

export default SearchInput;
