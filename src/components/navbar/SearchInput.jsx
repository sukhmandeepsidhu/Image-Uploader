import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './searchInputStyles.css';
import { AiOutlineReload } from 'react-icons/ai';

const SearchInput = ({ onSubmit, placeholder }) => {
  const [searchText, setSearchText] = useState('');
  const handleChange = (e) => {
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
