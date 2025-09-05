import { useState } from 'react';

import {
  modalOverlayStyle,
  modalViewStyle,
  modalHeader,
  modalTitle,
  modalDescription,
  labelStyle,
  typeSelectBoxStyle,
  typeButtonStyle,
  selectedTypeButtonStyle,
  inputStyle,
  buttonContainerStyle,
  buttonStyle,
  cancelButtonStyle,
  submitButtonStyle,
} from './styles';
import { supabase } from '../shared/lib/supabase/supabase';

interface QuestCreateModalProps {
  onClose: () => void;
}

export function QuestCreateModal({ onClose }: QuestCreateModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('normal');
  const [inputFocused, setInputFocused] = useState(false);

  const handleCreateQuest = async () => {
    if (!title.trim()) {
      alert('퀘스트 이름을 입력해주세요.');
      return;
    }

    try {
      const { error } = await supabase.from('quests').insert({
        title: title.trim(),
        type,
        reward: '',
      });

      if (error) {
        console.error('퀘스트 생성 오류:', error);
        alert('퀘스트 생성 중 오류가 발생했습니다.');
        return;
      }

      alert('퀘스트가 성공적으로 생성되었습니다!');
      onClose();

      // 페이지 새로고침 (실제 환경에서는 상태 업데이트로 처리하는 것이 좋습니다)
      window.location.reload();
    } catch (error) {
      console.error('퀘스트 생성 중 예외 발생:', error);
      alert('퀘스트 생성 중 오류가 발생했습니다.');
    }
  };

  const typeOptions = [
    {
      id: 'normal',
      label: '일반',
      description: '기본 퀘스트',
      color: '#52c41a',
    },
    {
      id: 'daily',
      label: '일일',
      description: '매일 수행하는 퀘스트',
      color: '#4a6bff',
    },
    {
      id: 'weekly',
      label: '주간',
      description: '매주 수행하는 퀘스트',
      color: '#ff7a45',
    },
  ];

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalViewStyle} onClick={(e) => e.stopPropagation()}>
        <div style={modalHeader}>
          <h2 style={modalTitle}>새로운 퀘스트 생성</h2>
          <p style={modalDescription}>
            새로운 퀘스트를 생성하여 일상을 기록해보세요.
          </p>
        </div>

        <label style={labelStyle}>퀘스트 종류</label>
        <div style={typeSelectBoxStyle}>
          {typeOptions.map((option) => (
            <div
              key={option.id}
              style={{
                ...typeButtonStyle,
                ...(type === option.id ? selectedTypeButtonStyle : {}),
                ...(type === option.id
                  ? { borderColor: option.color, color: option.color }
                  : {}),
              }}
              onClick={() => setType(option.id)}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {option.label}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                {option.description}
              </div>
            </div>
          ))}
        </div>

        <label style={labelStyle}>퀘스트 이름</label>
        <input
          type="text"
          style={{
            ...inputStyle,
            borderColor: inputFocused ? '#4a6bff' : '#ddd',
            boxShadow: inputFocused
              ? '0 0 0 2px rgba(74, 107, 255, 0.2)'
              : 'none',
          }}
          placeholder="퀘스트 이름을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          autoFocus
        />

        <div style={buttonContainerStyle}>
          <button
            style={{ ...buttonStyle, ...cancelButtonStyle }}
            onClick={onClose}
          >
            취소
          </button>
          <button
            style={{ ...buttonStyle, ...submitButtonStyle }}
            onClick={handleCreateQuest}
          >
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
