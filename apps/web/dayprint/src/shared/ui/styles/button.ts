import { CSSProperties } from 'react';

// 공통 버튼 스타일
export const buttonStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4a6bff',
  minWidth: '200px',
  height: '48px',
  padding: '0 24px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(74, 107, 255, 0.25)',
  transition: 'all 0.2s ease',
};

export const buttonText: CSSProperties = {
  fontWeight: 'bold',
  color: 'white',
  fontSize: '16px',
  margin: 0,
};
