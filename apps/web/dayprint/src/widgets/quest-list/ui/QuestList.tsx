import React, { useState, useEffect } from 'react';

import { Quest } from '../../../entities/quest/model';
import {
  getQuests,
  clearQuest,
  deleteQuest,
} from '../../../features/quest/api';

// 퀘스트 카드 스타일
const cardStyle = {
  backgroundColor: 'white',
  padding: '16px',
  borderRadius: '12px',
  marginBottom: '12px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const questTitleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: 500,
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '8px',
};

const actionButtonStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background 0.2s',
};

const completeButtonStyle = {
  backgroundColor: '#52c41a',
  color: 'white',
};

const deleteButtonStyle = {
  backgroundColor: '#ff4d4f',
  color: 'white',
};

interface QuestListProps {
  onRefresh?: () => void;
}

export function QuestList({ onRefresh }: QuestListProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuests = async () => {
    setLoading(true);
    const data = await getQuests();
    setQuests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleClearQuest = async (quest: Quest) => {
    if (window.confirm(`"${quest.title}" 퀘스트를 완료하시겠습니까?`)) {
      const success = await clearQuest(quest);
      if (success) {
        alert('퀘스트가 완료되었습니다!');
        fetchQuests();
        if (onRefresh) onRefresh();
      } else {
        alert('퀘스트 완료 중 오류가 발생했습니다.');
      }
    }
  };

  const handleDeleteQuest = async (quest: Quest) => {
    if (window.confirm(`"${quest.title}" 퀘스트를 삭제하시겠습니까?`)) {
      const success = await deleteQuest(quest);
      if (success) {
        alert('퀘스트가 삭제되었습니다.');
        fetchQuests();
        if (onRefresh) onRefresh();
      } else {
        alert('퀘스트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) {
    return <div>퀘스트를 불러오는 중...</div>;
  }

  if (quests.length === 0) {
    return <div>등록된 퀘스트가 없습니다.</div>;
  }

  return (
    <div>
      {quests.map((quest) => (
        <div key={quest.id} style={cardStyle}>
          <p style={questTitleStyle}>{quest.title}</p>
          <div style={buttonGroupStyle}>
            <button
              style={{ ...actionButtonStyle, ...completeButtonStyle }}
              onClick={() => handleClearQuest(quest)}
            >
              완료
            </button>
            <button
              style={{ ...actionButtonStyle, ...deleteButtonStyle }}
              onClick={() => handleDeleteQuest(quest)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
