import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import FoodType from "../foodType";

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = ["Veg", "Non Veg", "Egg"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close the dropdown
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block mx-6 mt-6 text-left rounded-2xl">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-[0.375rem] text-sm font-medium text-gray-700 bg-white border border-gray-300 shadow-sm rounded-2xl"
          id="menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedOption}
          <HiChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <div key={index} className="flex">
                <FoodType type={option} />
                <button
                  onClick={() => handleOptionClick(option)}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
