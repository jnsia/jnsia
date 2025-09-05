import { useState } from 'react';

import { buttonStyle, buttonText } from './styles';

interface QuestCreateButtonProps {
  text: string;
  handleClick: () => void;
}

export function QuestCreateButton({
  text,
  handleClick,
}: QuestCreateButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverStyle = isHovered
    ? {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 16px rgba(74, 107, 255, 0.35)',
      }
    : {};

  return (
    <button
      style={{
        ...buttonStyle,
        ...hoverStyle,
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p style={buttonText}>{text}</p>
    </button>
  );
}
