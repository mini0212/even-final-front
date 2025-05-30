import { CommonPostItem } from "@/types/post";

const HomeSectionListItem = ({ title, createdAt }: CommonPostItem) => {
  return (
    <div className="flex justify-between text-sm gap-1">
      <span className="text-gray900 line-clamp-1 whitespace-nowrap">
        {title}
      </span>
      <span className="text-gray600 whitespace-nowrap">{createdAt}</span>
    </div>
  );
};

export default HomeSectionListItem;
