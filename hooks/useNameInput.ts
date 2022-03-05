import { useState } from 'react';

const LEN_LIMIT = 45;

const useNameInput = (initialState?: string) => {
  const [name, setName] = useState(initialState || '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > LEN_LIMIT) {
      return;
    }

    setName(value);
  };

  return { name, handleNameChange };
};

export default useNameInput;
