import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";

function App() {
  // 从 localStorage 读取数据，防止刷新丢失
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    date: "",
    type: "收入",
    amount: "",
    description: ""
  });

  // 每次 entries 变化都同步保存到 localStorage
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  // 表单输入处理
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 提交新增条目
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { ...form, amount: parseFloat(form.amount) };
    setEntries([...entries, newEntry]);
    setForm({ date: "", type: "收入", amount: "", description: "" });
  };

  // 删除指定条目
  const deleteEntry = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };

  // 计算收入、支出、结余
  const income = entries
    .filter((e) => e.type === "收入")
    .reduce((sum, e) => sum + e.amount, 0);

  const expense = entries
    .filter((e) => e.type === "支出")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = income - expense;

  // 导出 Excel 功能
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "账本");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "公司账本.xlsx");
  };

  return (
    <div className="container">
      <h1>公司记账本</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="收入">收入</option>
          <option value="支出">支出</option>
        </select>
        <input
          name="amount"
          type="number"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="金额"
          required
        />
        <input
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="描述"
        />
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
        <button onClick={exportToExcel}>导出 Excel</button>
      </div>
    </div>
  );
}

export default App;
