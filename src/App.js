import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw = await fetch("https://randomuser.me/api/?results=29");
        const jsonData = await raw.json();
        setData(
          jsonData.results.map((item) => ({
            name: `${item.name.first} ${item.name.last}`,
            gender: item.gender,
            email: item.email,
            phone: item.phone,
            city: item.location.city,
            state: item.location.state
          }))
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>State</th>
        </tr>
        {data.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.gender}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
