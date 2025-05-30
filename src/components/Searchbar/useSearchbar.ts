"use client";

import { MainCategory, SubCategoryValue } from "@/types/category";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useEffect, useRef, useState, RefObject } from "react";

const useSearchbar = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [onlyTag, setOnlyTag] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryValue | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"main" | "sub" | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const subButtonRef = useRef<HTMLButtonElement | null>(null);
  const mainDropdownRef = useRef<HTMLUListElement | null>(null);
  const subDropdownRef = useRef<HTMLUListElement | null>(null);

  const [buttonWidth, setButtonWidth] = useState(0);
  const [subButtonWidth, setSubButtonWidth] = useState(0);

  const measureButtonWidth = (
    ref: RefObject<HTMLButtonElement | null>,
    setter: (w: number) => void,
  ) => {
    if (ref.current) {
      setter(ref.current.offsetWidth);
    }
  };

  useLayoutEffect(() => {
    measureButtonWidth(buttonRef, setButtonWidth);
  }, [selectedMainCategory]);

  useLayoutEffect(() => {
    measureButtonWidth(subButtonRef, setSubButtonWidth);
  }, [selectedMainCategory, selectedMainCategory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        subButtonRef.current?.contains(target) ||
        mainDropdownRef.current?.contains(target) ||
        subDropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectMainCategory = (category: MainCategory | null) => {
    setSelectedMainCategory(category);
    setOpenDropdown(null);
  };

  const selectSubCategory = (category: SubCategoryValue | null) => {
    setSelectedSubCategory(category);
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    const query = new URLSearchParams();
    query.set("keyword", keyword);
    if (selectedMainCategory) {
      query.set("category", selectedMainCategory);
    }
    if (selectedSubCategory) {
      query.set("tag", selectedSubCategory);
    }
    if (onlyTag) {
      query.set("onlyTag", "true");
    }
    router.push(`/search?${query.toString()}`);
  };

  return {
    keyword,
    setKeyword,
    setOnlyTag,
    selectedMainCategory,
    setSelectedMainCategory,
    selectedSubCategory,
    setSelectedSubCategory,
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
  };
};

export default useSearchbar;
