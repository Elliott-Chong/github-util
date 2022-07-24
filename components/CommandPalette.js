import React from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";

function CommandPalette({ repos }) {
  const [open, setOpen] = React.useState(true);
  return (
    <Dialog
      open={open}
      onClose={setOpen}
      className="fixed inset-0 pt-[25vh] overflow-y-auto"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
      <Combobox
        as={"div"}
        className="bg-white relative max-w-[50vw] mx-auto rounded-xl shadow-2xl divide-y"
      >
        <div className="flex items-center py-2 px-4">
          <SearchIcon className="w-6 h-6" />
          <Combobox.Input
            className="w-full outline-none bg-transparent py-2 px-4 text-xl font-spacemono"
            placeholder="Search..."
          />
        </div>
        <Combobox.Options
          static
          className="py-4 max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-orange-300"
        >
          {repos.map((repo) => {
            return (
              <Combobox.Option key={repo.id}>
                {({ active }) => {
                  <div
                    className={`px-8 py-2 font-mono text-md ${
                      active && "bg-indigo-400"
                    }`}
                  >
                    {repo.name}
                  </div>;
                }}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  );
}

export default CommandPalette;
