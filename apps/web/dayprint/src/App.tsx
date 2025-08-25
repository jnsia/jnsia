import './App.css';

function App() {
  const days = 39; // 13 + 22 + 4
  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <div className="app-container">
      <h1 className="title">DayPrint</h1>
      <p className="subtitle">일일 카운터</p>
      
      <div className="counter-display">{days}</div>
      <p className="days-label">일째</p>
      
      <p className="description">
        매일매일 쌓아가는 소중한 기록들을 확인하세요
      </p>
      
      <div className="progress-bar">
        <div className="progress-fill" />
      </div>
      
      <div className="date-info">
        오늘: {currentDate}
      </div>
    </div>
  );
}

export default App;
