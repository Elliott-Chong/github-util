import React from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import moment from "moment";

function CommandPalette({ repos }) {
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [filteredRepos, setFilteredRepos] = React.useState(repos);

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
    setFilteredRepos(
      filteredRepos
        .filter((repo) => repo.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    );
    if (query == "") {
      setFilteredRepos(repos);
    }
  }, [query, repos]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(true)}
      className="fixed inset-0 pt-[25vh] overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-900" />

      <Combobox
        as={"div"}
        className="bg-white overflow-hidden relative max-w-[90vw] md:max-w-[50vw] mx-auto rounded-xl shadow-2xl divide-y"
        onChange={(repo) => {
          window.location.href = repo.html_url;
        }}
      >
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
            className="py-4 max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-orange-300"
          >
            {filtered_repos.map((repo) => {
              return (
                <Combobox.Option value={repo} key={repo.id}>
                  {({ active }) => {
                    return (
                      <div
                        className={`px-8 py-4 text-sm md:text-xl font-mono gap-4 flex items-center text-md ${
                          active && "bg-orange-400 font-bold text-white"
                        }`}
                      >
                        <a rel="noreferrer" href={repo.html_url}>
                          {repo.name}
                        </a>
                        <span
                          className={`text-sm rounded-full text-white py-1 px-2 ${
                            active ? "bg-orange-500" : "bg-orange-500"
                          } `}
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
