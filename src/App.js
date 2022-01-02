import "./styles.css";
import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ key: "", value: 0 });
  const [query, setQuery] = useState("");

  const sortedData = useMemo(() => {
    // if (!filter.value) return data;
    let dataCloned = [...data];
    if (query) {
      dataCloned = dataCloned.filter((item) =>
        Object.values(item).join(" ").includes(query)
      );
    }
    return dataCloned.sort(
      (a, b) =>
        a?.[filter?.key]?.localeCompare(b?.[filter?.key]) * filter?.value || 0
    );
  }, [filter, data, query]);

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

  const onSortColumn = (col) => {
    if (filter.key !== col || !filter.value) {
      setFilter({
        key: col,
        value: -1
      });
    } else if (filter.value === -1) {
      setFilter({
        ...filter,
        value: 1
      });
    } else {
      setFilter({
        ...filter,
        value: 0
      });
    }
  };
  const renderHeader = () => {
    const columns = [
      {
        key: "name",
        title: "Name"
      },
      {
        key: "gender",
        title: "Gender"
      },
      {
        key: "email",
        title: "Email"
      },
      {
        key: "phone",
        title: "Phone"
      },
      {
        key: "city",
        title: "City"
      },
      {
        key: "state",
        title: "State"
      }
    ];
    const sortIcon = filter.value === 1 ? faCaretUp : faCaretDown;
    return (
      <thead>
        <tr>
          {columns.map(({ key, title }) => (
            <th
              className="tbl__header"
              onClick={() => onSortColumn(key)}
              key={key}
            >
              <div className="tbl__header__title">
                {title}
                {filter.key === key && !!filter.value && (
                  <FontAwesomeIcon
                    icon={sortIcon}
                    className="tbl__header__icon"
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const onSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="query">
        <label for="query-input" className="query__label">
          Search
        </label>
        <input
          id="query-input"
          className="query__input"
          type="text"
          onChange={onSearch}
          value={query}
        />
      </div>
      <table>
        {renderHeader()}
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={`${item.name}_${index}`}>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
