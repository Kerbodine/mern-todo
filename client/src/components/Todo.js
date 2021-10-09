import React from "react";
import { BiCheck, BiX } from "react-icons/bi";

export default function Todo({ id, text, complete, completeTodo, deleteTodo }) {
  return (
    <div className="bg-gray-100 p-2 pl-4 rounded-md flex items-center cursor-pointer">
      <div
        className={`w-6 h-6 mr-4 rounded-md ${
          complete ? "bg-gray-800" : "border-gray-300 border-2"
        } text-2xl flex items-center justify-center`}
        onClick={() => {
          completeTodo(id);
        }}
      >
        <BiCheck className={`${complete ? "visible" : "hidden"} text-white`} />
      </div>
      <p>{text}</p>
      <div
        className="w-8 h-8 hover:bg-gray-200 font-medium rounded-md flex items-center justify-center ml-auto text-2xl"
        onClick={() => {
          deleteTodo(id);
        }}
      >
        <BiX />
      </div>
    </div>
  );
}
