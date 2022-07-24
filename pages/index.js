import React from "react";
import CommandPalette from "../components/CommandPalette";
import axios from "axios";
import Head from "next/head";
// import moment from "moment";
import data from "../repos";
export default function Home() {
  const [repos, setRepos] = React.useState([]);
  React.useEffect(() => {
    const fetchRepos = async () => {
      const response = await axios.get(
        "https://api.github.com/users/elliott-chong/repos?per_page=100"
      );
      setRepos(response.data);
    };
    fetchRepos();
  }, []);
  repos.sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  return (
    <>
      <Head>
        <title>Elliott&apos;s GitHub</title>
      </Head>
      <CommandPalette repos={repos} />
      {/* <UpdateTiming setRepos={setRepos} /> */}
    </>
  );
}
