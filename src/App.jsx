import { useState } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: '',
    type: '收入',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...form, amount: parseFloat(form.amount) };
    setEntries([...entries, newEntry]);
    setForm({ date: '', type: '收入', amount: '', description: '' });
  };

  const deleteEntry = (index) => {
  const newEntries = [...entries];
  newEntries.splice(index, 1); // 删除第 index 项
  setEntries(newEntries);
  };

  const income = entries.filter(e => e.type === '收入').reduce((sum, e) => sum + e.amount, 0);
  const expense = entries.filter(e => e.type === '支出').reduce((sum, e) => sum + e.amount, 0);
  const balance = income - expense;

  return (
    <div className="container">
      <h1>公司记账本</h1>
      <form onSubmit={handleSubmit}>
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="收入">收入</option>
          <option value="支出">支出</option>
        </select>
        <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="金额" required />
        <input name="description" type="text" value={form.description} onChange={handleChange} placeholder="描述" />
        <button type="submit">添加</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>类型</th>
            <th>金额</th>
            <th>描述</th>
            <th>操作</th>
          </tr>
        </thead>
<tbody>
  {entries.map((e, index) => (
    <tr key={index}>
      <td>{e.date}</td>
      <td>{e.type}</td>
      <td>{e.amount.toFixed(2)}</td>
      <td>{e.description}</td>
      <td>
        <button onClick={() => deleteEntry(index)}>删除</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      <div className="summary">
        <p>总收入：{income.toFixed(2)}</p>
        <p>总支出：{expense.toFixed(2)}</p>
        <p>结余：{balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
