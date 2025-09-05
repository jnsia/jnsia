import React, { useState } from 'react';

import { QuestCreateButton, QuestCreateModal } from '../../../features/quest';
import { QuestList } from '../../../widgets/quest-list';

// 페이지 컨테이너 스타일
const pageContainerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '24px 16px',
};

const headerStyle = {
  textAlign: 'center' as const,
  marginBottom: '32px',
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  color: '#333',
};

const descriptionStyle = {
  fontSize: '16px',
  color: '#666',
  margin: 0,
};

const questSectionStyle = {
  marginBottom: '32px',
};

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '16px',
  color: '#444',
};

export function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={pageContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>데이프린트</h1>
        <p style={descriptionStyle}>일상을 퀘스트로 기록해보세요</p>
      </header>

      <section style={questSectionStyle}>
        <h2 style={sectionTitleStyle}>나의 퀘스트 목록</h2>
        <QuestList />
      </section>

      <QuestCreateButton
        text="새 퀘스트 생성하기"
        handleClick={handleCreateClick}
      />

      {showModal && <QuestCreateModal onClose={handleCloseModal} />}
    </div>
  );
}
