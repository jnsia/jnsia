import { useState } from 'react';

interface QuestCreateButtonProps {
  text: string;
  handleClick: () => void;
}

// 버튼 스타일
const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '16px',
  backgroundColor: '#4A6BFF',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
};

const buttonText = {
  color: 'white',
  fontSize: '16px',
  fontWeight: 600,
  margin: 0,
};

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
