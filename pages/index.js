import React from "react";
import CommandPalette from "../components/CommandPalette";
import moment from "moment";
import data from "../test";
export default function Home() {
  const [repos, setRepos] = React.useState(data);
  repos.sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  return (
    <>
      <CommandPalette repos={repos} />
      <div className="flex flex-col min-h-screen bg-amber-600 justify-center items-center">
        <h1 className="text-4xl font-poppins text-amber-400 font-bold hover:text-amber-500">
          Welcome Back Elliott!
        </h1>

        <div className="bg-red-500 flex flex-col gap-5 p-10 h-[80vh] overflow-scroll scrollbar-thin scrollbar-thumb-zinc-800">
          {repos.map((repo) => {
            return (
              <div className="font-spacemono text-white font-semibold ">
                <a
                  className="underline"
                  target={"_blank"}
                  href={repo.html_url}
                  key={repo.id}
                >
                  {repo.name}
                </a>
                <span>
                  {" "}
                  - updated{" "}
                  {moment
                    .duration(moment(repo.updated_at).diff(Date.now()))
                    .humanize()}{" "}
                  ago
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
