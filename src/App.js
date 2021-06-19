import React, { useEffect, useState } from "react";

import axios from "axios";

import "./App.css";
const App = () => {
  const [user, setUser] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const gotoNext = () => {
    const newPageNo = pageNo + 1;
    setPageNo(newPageNo);
  };
  const gotoPrev = () => {
    const newPageNo = pageNo - 1;
    setPageNo(newPageNo);
  };

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=" + pageNo)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.data);
        setTotalPage(res.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log("Request Completed");
      });
  }, [pageNo]);
  return (
    <div>
      <h2>Hello World</h2>
      <button onClick={gotoPrev} disabled={pageNo === 1}>
        Prev
      </button>
      <button onClick={gotoNext} disabled={pageNo === totalPage}>
        Next
      </button>
      <h3> Page: {pageNo}</h3>
      {user === null ? (
        <h3>Loading....</h3>
      ) : (
        <div>
          {user.map((item) => {
            return (
              <div className="userWrapper" key={item.id}>
                <h3>
                  {item.first_name} {item.last_name}
                </h3>
                <p>{item.email}</p>
                <img src={item.avatar} alt="" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default App;
