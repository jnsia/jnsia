import { CSSProperties } from 'react';

// 모달 스타일
export const modalOverlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1100,
  backdropFilter: 'blur(3px)',
};

export const modalViewStyle: CSSProperties = {
  backgroundColor: 'white',
  width: '90%',
  maxWidth: 500,
  padding: 24,
  borderRadius: 16,
  overflowY: 'auto',
  maxHeight: '90vh',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
};

export const modalHeader: CSSProperties = {
  marginBottom: 24,
  textAlign: 'center',
};

export const modalTitle: CSSProperties = {
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  color: '#333',
};

export const modalDescription: CSSProperties = {
  fontSize: '14px',
  color: '#666',
  margin: 0,
};

export const labelStyle: CSSProperties = {
  fontWeight: '600',
  marginBottom: 8,
  display: 'block',
  fontSize: '15px',
  color: '#444',
};

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  marginBottom: 20,
  border: '1px solid #ddd',
  borderRadius: 8,
  fontSize: '15px',
  transition: 'border-color 0.2s',
  outline: 'none',
};

export const buttonContainerStyle: CSSProperties = {
  display: 'flex',
  gap: 12,
  marginTop: 24,
};

export const cancelButtonStyle: CSSProperties = {
  flex: 1,
  padding: '12px',
  backgroundColor: '#f5f5f5',
  color: '#666',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.2s',
};

export const submitButtonStyle: CSSProperties = {
  flex: 2,
  padding: '12px',
  backgroundColor: '#4a6bff',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(74, 107, 255, 0.25)',
  transition: 'all 0.2s',
};
