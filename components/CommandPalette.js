import React from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import moment from "moment";
import axios from "axios";

function CommandPalette({ repos }) {
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [filteredRepos, setFilteredRepos] = React.useState(repos);
  const [quote, setQuote] = React.useState("");

  React.useEffect(() => {
    const keyDown = (e) => {
      if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
        setOpen(true);
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, []);

  const filtered_repos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    const fetchQuote = () => {
      const options = {
        method: "GET",
        url: "https://inspiring-quotes.p.rapidapi.com/random",
        headers: {
          "X-RapidAPI-Key":
            "1ae952a8a0msh651fc3a8bb332a9p181474jsnc121f25ba418",
          "X-RapidAPI-Host": "inspiring-quotes.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setQuote(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchQuote();
    // const inter = setInterval(fetchQuote, 5000);
    // return () => clearInterval(inter);
  }, []);

  React.useEffect(() => {
    setFilteredRepos(
      filteredRepos
        .filter((repo) => repo.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    );
    if (query == "") {
      setFilteredRepos(repos);
    }
  }, [query, repos, setFilteredRepos]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(true)}
      className="fixed inset-0 overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-900" />

      <Combobox
        as={"div"}
        className="bg-white top-1/2 -translate-y-1/2 overflow-hidden relative max-w-[90vw] md:max-w-[50vw] mx-auto rounded-xl shadow-2xl divide-y"
        onChange={(repo) => {
          window.location.href = repo.html_url;
        }}
      >
        {quote && (
          <h1 className="text-start px-8 text-slate-700 font-spacemono font-bold text-lg md:text-2xl py-6">
            {quote.quote}
            <br />
            <span className="font-dmserif bg-slate-800 py-1 px-4 text-white rounded-lg mt-4 inline-block shadow-2xl">
              {quote.author}
            </span>
          </h1>
        )}
        <div className="flex items-center py-2 px-4">
          <SearchIcon className="w-6 h-6" />
          <Combobox.Input
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="w-full outline-none bg-transparent py-2 px-4 text-xl font-spacemono"
            placeholder="Search..."
          />
        </div>
        {filteredRepos.length > 0 && (
          <Combobox.Options
            static
            className="py-4 max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-slate-600"
          >
            {filtered_repos.map((repo) => {
              return (
                <Combobox.Option value={repo} key={repo.id}>
                  {({ active }) => {
                    return (
                      <div
                        className={`md:px-8 px-4 py-4 text-sm md:text-xl font-mono gap-2 md:gap-4 flex items-center text-md ${
                          active && "bg-slate-800 font-bold text-white"
                        }`}
                      >
                        <a rel="noreferrer" href={repo.html_url}>
                          {repo.name}
                        </a>
                        <span
                          className={`text-sm rounded-full text-white whitespace-nowrap py-1 px-4 bg-slate-700`}
                        >
                          {moment
                            .duration(moment(repo.updated_at).diff(Date.now()))
                            .humanize()}{" "}
                        </span>
                      </div>
                    );
                  }}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
        )}
      </Combobox>
    </Dialog>
  );
}

export default CommandPalette;
