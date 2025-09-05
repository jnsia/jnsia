import { CSSProperties } from 'react';

export const typeSelectBoxStyle: CSSProperties = {
  display: 'flex',
  gap: 10,
  marginBottom: 24,
};

export const typeButtonStyle: CSSProperties = {
  flex: 1,
  padding: 14,
  border: '1px solid #ddd',
  borderRadius: 10,
  textAlign: 'center',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.2s',
  backgroundColor: '#f9f9f9',
};

export const selectedTypeButtonStyle: CSSProperties = {
  borderColor: '#4a6bff',
  backgroundColor: 'rgba(74, 107, 255, 0.1)',
  color: '#4a6bff',
};
