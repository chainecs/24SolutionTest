import { useEffect } from "react";
import { useGlobalContext } from "./context";
import "./App.css";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

function App() {
  const { setRows, searchKey, setStartRow } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      const stRow = 0; //create this variable to avoid Promises hell
      await axios
        .get(
          `http://localhost:5001/api/user?q=${searchKey}&start=${stRow}&limit=10`
        )
        .then((res) => {
          if (res.data === "No Data") {
            console.log("No Data");
          } else {
            setRows(res.data);
            setStartRow(stRow);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [searchKey, setRows, setStartRow]);

  return (
    <div className="App">
      <h1 className="w-full text-full text-[#2e2e2e] font-bold text-center pt-5">
        Front-End
      </h1>
      <SearchBox />
      <Pagination />
      <Table />
    </div>
  );
}

export default App;
