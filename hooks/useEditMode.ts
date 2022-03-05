import { useState } from 'react';

const useEditMode = () => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = (onSave: (newValue: string) => void, newValue: string) => {
    onSave(newValue);
    toggleEditMode();
  };

  return { editMode, toggleEditMode, handleSave };
};

export default useEditMode;
