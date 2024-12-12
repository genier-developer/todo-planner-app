import { KeyboardEvent, useState } from "react"


type EditableSpanProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const EditableSpan = ({ value, onChange, disabled, onKeyDown }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const activateEditMode = () => {
    if (!disabled) setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false)
    onChange(currentValue)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      deactivateEditMode()
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  };

  return editMode ? (
    <input
      type="text"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={deactivateEditMode}
      onKeyDown={handleKeyDown}
      autoFocus
      disabled={disabled}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  )
}
