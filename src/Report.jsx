import React from 'react';

const Report = ({ entries }) => {
  const grouped = entries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <div>
      <h2>每日报表</h2>
      {Object.keys(grouped).map(date => {
        const daily = grouped[date];
        const income = daily.filter(e => e.type === '收入').reduce((sum, e) => sum + e.amount, 0);
        const expense = daily.filter(e => e.type === '支出').reduce((sum, e) => sum + e.amount, 0);
        return (
          <div key={date} style={{ marginBottom: 10, border: '1px solid #ccc', padding: 10 }}>
            <h4>{date}</h4>
            <p>收入：{income.toFixed(2)} 元</p>
            <p>支出：{expense.toFixed(2)} 元</p>
            <p>结余：{(income - expense).toFixed(2)} 元</p>
          </div>
        );
      })}
    </div>
  );
};

export default Report;
