import React, { useEffect, useState } from "react";

export default function Menu() {
  const [food, setFood] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [option, setOption] = useState("");
  const [elem, setElem] = useState([]);

  const [foodName, setFoodname] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [foodPrice, setfoodPrice] = useState("");

  function addFood() {
    let obj = {"food":foodName, "description":foodDesc,"price":foodPrice, "options":optionList}
    console.log(obj)
  }
  function addOption() {
    if (option.trim() != "") {
      setOptionList([...optionList, { option: option, elements: [] }]);
      setElem([...elem, { option: option, state: "" }]);

      setOption("");
    }
  }
  function adInnerOption(_option) {
    let newItem = elem.find((a) => a.option == _option).state;

    setOptionList((prevOptionList) => {
      return prevOptionList.map((option) => {
        if (option.option === _option) {
          return {
            ...option,
            elements: [...option.elements, newItem],
          };
        }
        return option;
      });
    });
  }

  function handleDeleteElement(optionElement, indexToDelete) {
    setOptionList((prevOptionList) => {
      return prevOptionList.map((option) => {
        if (option.option === optionElement.option) {
          return {
            ...option,
            elements: option.elements.filter(
              (_, index) => index !== indexToDelete
            ),
          };
        }
        return option;
      });
    });
  }
  useEffect(() => {
    console.log(elem);
  }, [elem]);
  return (
    <div className="flex flex-col place-items-center pt-12 w-[25%] m-auto py-12 gap-1 pb-12">
      <p className="w-full col-span-4">Food name:</p>
      <div className=" w-full flex flex-row">
        <input
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter the food name"
          className="border-2 border-slate-200 shadow-md px-4 py-3 h-10  focus:outline-none rounded-md w-full"
        ></input>
      </div>

      <p className="w-full col-span-4 pt-3">Food Description:</p>
      <div className=" w-full">
        <textarea
          onChange={(e) => setFoodDesc(e.target.value)}
          placeholder="Enter the food description"
          class="resize-y border-2 border-slate-200 shadow-md px-4 py-3 h-16  focus:outline-none rounded-md w-full"
        ></textarea>
      </div>

      <p className="w-full col-span-4 pt-2">Food Immage:</p>
      <div className=" w-full">
        <label class="block">
          <input
            type="file"
            class="block w-full text-sm text-slate-500 border-2 border-slate-200 px-4 py-4 rounded-md shadow-md cursor-pointer duration-200
      file:mr-4 file:py-2 file:px-4
      file:cursor-pointer
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-[#db3748] file:bg-opacity-20 file:text-[#db3748] file:duration-200
      hover:file:bg-opacity-40
    "
          />
        </label>
      </div>

      <p className="w-full col-span-4">Food Price:</p>
      <div className=" w-[40%] mr-auto flex flex-row">
        <input
          onChange={(e) => setfoodPrice(e.target.value)}
          placeholder="...$"
          className="border-2 border-slate-200 shadow-md px-4 py-3 h-10  focus:outline-none rounded-md w-full"
        ></input>
        <span className="pt-1 text-lg font-semibold pl-3">$</span>
      </div>

      <p className="w-full pt-4">Food Options:</p>
      <div className="flex flex-row  w-full">
        <input
          placeholder="Enter the food name"
          onChange={(e) => setOption(e.target.value)}
          value={option}
          className="border-2 border-slate-200 shadow-md px-4 py-3 h-10  focus:outline-none rounded-l-md w-full"
        ></input>

        <button
          className="w-[35%] bg-red-400 shadow-md rounded-r-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 "
          onClick={() => addOption()}
        >
          Add
        </button>
      </div>
      <h3 className="w-full pt-2">Options</h3>

      <div className="w-full pt-2  flex flex-row gap-3 flex-wrap">
        {optionList.map((optionElement) => (
          <button
            className="w-auto px-4  py-2 bg-red-400 shadow-md rounded-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 flex flex-row"
            onClick={() =>
              setOptionList(
                optionList.filter(
                  (element) => element.option != optionElement.option
                )
              )
            }
          >
            {optionElement.option}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-[-8px] ml-[3px] mt-[-4px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        ))}
      </div>

      {optionList.map((optionElement) => (
        <div className="w-full pt-2">
          <h3>{optionElement.option}</h3>

          <div className="flex flex-row  w-full">
            <input
              placeholder="Option"
              className="border-2 border-slate-200 shadow-md px-4 py-3 h-10 focus:outline-none rounded-l-md w-full"
              onChange={(e) => {
                const newValue = e.target.value;
                setElem((prevState) => {
                  const updatedElem = prevState.map((item) => {
                    if (item.option === optionElement.option) {
                      return { ...item, state: newValue };
                    }
                    return item;
                  });
                  return updatedElem;
                });
              }}
            />

            <button
              className="w-[35%] bg-red-400 shadow-md rounded-r-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 "
              onClick={() => adInnerOption(optionElement.option)}
            >
              Add
            </button>
          </div>

          <div className="w-full pt-2 flex flex-row gap-3 flex-wrap">
            {optionElement.elements.map((element, index) => (
              <div className="" key={index}>
                <button
                  className="w-auto px-4  py-2 bg-red-400 shadow-md rounded-md bg-[#db3748] bg-opacity-25 cursor-pointer text-[#db3748] duration-200 hover:bg-opacity-40 flex flex-row"
                  onClick={() => handleDeleteElement(optionElement, index)}
                >
                  {element}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-[-8px] ml-[3px] mt-[-4px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        className="bg-[#db3748] text-slate-800 bg-opacity-40 w-full h-10 rounded-md shadow-md mt-2 py-1 px-2 font-semibold text-md mt-4 duration-200 hover:bg-opacity-60"
        onClick={() => addFood()}
      >
        Save
      </button>
    </div>
  );
}
