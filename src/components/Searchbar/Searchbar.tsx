"use client";
import { MainCategory } from "@/types/category";
import IconButton from "../common/Button/IconButton";
import { SearchIcon } from "../common/Icons";
import MainCategoryDropdown from "../Dropdown/MainCategoryDropdown";
import useSearchbar from "./useSearchbar";
import SubCategoryDropdown from "../Dropdown/SubCategoryDropdown";
import { useEffect } from "react";

interface SearchbarProps {
  mainCategory?: MainCategory | null;
  onlyTag?: boolean;
  inputKeyword?: string;
}

const Searchbar = ({
  mainCategory = null,
  onlyTag = false,
  inputKeyword,
}: SearchbarProps) => {
  const {
    keyword,
    setKeyword,
    setOnlyTag,
    selectedMainCategory,
    selectedSubCategory,
    openDropdown,
    setOpenDropdown,
    selectMainCategory,
    selectSubCategory,
    handleSearch,
    buttonRef,
    subButtonRef,
    mainDropdownRef,
    subDropdownRef,
    buttonWidth,
    subButtonWidth,
  } = useSearchbar();

  useEffect(() => {
    if (mainCategory) selectMainCategory(mainCategory);
    if (inputKeyword) setKeyword(inputKeyword);
    if (onlyTag) setOnlyTag(onlyTag);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="w-full max-w-full"
    >
      <div className="relative flex gap-2">
        {mainCategory && onlyTag ? (
          <SubCategoryDropdown
            selectedMainCategory={selectedMainCategory ?? mainCategory}
            selectedSubCategory={selectedSubCategory}
            isDropdownOpen={openDropdown === "sub"}
            toggleDropdown={() =>
              setOpenDropdown((prev) => (prev === "sub" ? null : "sub"))
            }
            selectSubCategory={selectSubCategory}
            buttonRef={buttonRef}
            dropdownRef={mainDropdownRef}
            buttonWidth={buttonWidth}
          />
        ) : (
          <MainCategoryDropdown
            selectedCategory={selectedMainCategory ?? mainCategory}
            isDropdownOpen={openDropdown === "main"}
            toggleDropdown={() =>
              setOpenDropdown((prev) => (prev === "main" ? null : "main"))
            }
            selectCategory={selectMainCategory}
            buttonRef={subButtonRef}
            dropdownRef={subDropdownRef}
            buttonWidth={subButtonWidth}
            showAllOption={true}
          />
        )}

        <div className="flex items-center bg-white border border-gray200 text-gray900 rounded-lg w-full">
          <input
            type="text"
            className="flex-1 px-4 py-2 focus:outline-none focus:ring-0"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton
            type="submit"
            icon={<SearchIcon />}
            size="md"
            variant="icon"
            label="검색"
            isTransparent
            className="mx-2"
          />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
