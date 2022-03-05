import { useState } from 'react';

const useEditMode = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return { editMode, toggleEditMode };
};

export default useEditMode;
