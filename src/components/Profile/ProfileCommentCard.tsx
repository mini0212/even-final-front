"use client";

import { UserCommentedItem } from "@/types/post";
import { getSubCategoryEmoji, getSubCategoryLabel } from "@/utils/category";
import { getSimplifiedDate } from "@/utils/date";
import { removeMarkdownImages } from "@/utils/image";
import { ChevronRightIcon, HeartIcon, MessageCircle } from "lucide-react";

interface ProfileCommentCardProps {
  item: UserCommentedItem;
}

const ProfileCommentCard = ({ item }: ProfileCommentCardProps) => {
  return (
    <div className="flex flex-col w-full pt-3 pb-3 gap-2 border-b">
      <div className="flex flex-col">
        <p className="text-gray900 line-clamp-2">
          {removeMarkdownImages(item.commentContent)}
        </p>
        <p className="text-gray600 text-sm">
          {getSimplifiedDate(item.commentCreatedAt)}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm gap-x-2">
        <div className="flex items-center text-gray600 min-w-0 flex-1">
          <span className="whitespace-nowrap flex-shrink-0">
            {getSubCategoryLabel(item.tag)}
          </span>
          <ChevronRightIcon width={16} height={16} className="flex-shrink-0" />
          <span className="whitespace-nowrap flex-shrink-0">
            {getSubCategoryEmoji(item.tag)}
          </span>
          <span className="truncate text-gray900 flex-shrink min-w-0">
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray600 flex-shrink-0">
          <div className="flex items-center gap-1">
            <HeartIcon width={12} height={12} />
            {item.likeCount}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle width={12} height={12} />
            {item.commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCommentCard;
