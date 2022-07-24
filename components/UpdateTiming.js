import React from "react";
import axios from "axios";
import { updateRepos } from "../repos";

function UpdateTiming({ setRepos }) {
  const fetchRepos = async () => {
    const response = await axios.get(
      "https://api.github.com/users/elliott-chong/repos?per_page=100"
    );
    setRepos(response.data);
    updateRepos(response.data);
  };
  return (
    <div className="fixed bottom-[1rem] text-white flex items-center gap-2 z-[50] right-[1rem]">
      <button
        className="py-1 px-2 bg-orange-400 rounded-full font-bold"
        onClick={() => {
          fetchRepos();
        }}
      >
        update now
      </button>
      <p>updated yesterday</p>
    </div>
  );
}

export default UpdateTiming;
