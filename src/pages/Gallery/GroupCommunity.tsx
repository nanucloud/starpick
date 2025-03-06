import React, { useState } from "react";
import { Heart, MessageCircle, Calendar, User } from "lucide-react";

interface CommunityPostProps {
  id: string;
  title: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  title,
  author,
  date,
  likes,
  comments,
}) => {
  return (
    <div className="border-b border-blue-100 py-4 hover:bg-blue-50 transition-colors duration-200">
      <h3 className="text-lg font-medium mb-1 hover:text-indigo-500 transition-colors duration-200 cursor-pointer">
        {title}
      </h3>
      <div className="flex items-center text-sm text-gray-500">
        <span>{author}</span>
        <span className="mx-2">•</span>
        <span>{date}</span>
        <span className="mx-2">•</span>
        <span className="flex items-center">
          <Heart size={14} className="mr-1 text-indigo-300" />
          {likes}
        </span>
        <span className="mx-2">•</span>
        <span className="flex items-center">
          <MessageCircle size={14} className="mr-1 text-blue-300" />
          {comments}
        </span>
      </div>
    </div>
  );
};

const GroupCommunity: React.FC = () => {
  // 더미 데이터 (실제로는 API에서 가져올 것)
  const communityPosts = [
    {
      id: "1",
      title: "아이브 MMA 2025 무대 리뷰",
      author: "아이브팬01",
      date: "2025.03.05",
      likes: 142,
      comments: 38,
    },
    {
      id: "2",
      title: "레이 신곡 티저 공개! 여러분의 생각은?",
      author: "레이사랑해",
      date: "2025.03.04",
      likes: 287,
      comments: 93,
    },
    {
      id: "3",
      title: "안유진 팬사인회 후기 (+ 사진)",
      author: "유진러버",
      date: "2025.03.03",
      likes: 201,
      comments: 45,
    },
    {
      id: "4",
      title: "가을 컴백 소문이 사실인가요?",
      author: "아이브덕후",
      date: "2025.03.02",
      likes: 176,
      comments: 67,
    },
    {
      id: "5",
      title: "이서 팬미팅 티켓 오픈 정보",
      author: "이서바라기",
      date: "2025.03.01",
      likes: 223,
      comments: 52,
    },
  ];

  const [activeCategory, setActiveCategory] = useState("전체");
  const categories = ["전체", "공지사항", "팬아트", "후기", "정보"];

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center w-full justify-between">
        <div className="flex space-x-2 overflow-x-auto flex-1">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-[#1f1f1f] text-white"
                  : "bg-white border border-black-800 text-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <button className="px-4 py-2 bg-indigo-400 hover:bg-indigo-500 text-white rounded-full text-sm">
          글쓰기
        </button>
      </div>

      <div>
        {communityPosts.map((post) => (
          <CommunityPost key={post.id} {...post} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <button className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded hover:bg-blue-50 transition-colors duration-200">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-indigo-300 text-indigo-800 rounded">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded hover:bg-blue-50 transition-colors duration-200">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded hover:bg-blue-50 transition-colors duration-200">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-blue-200 rounded hover:bg-blue-50 transition-colors duration-200">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
export default GroupCommunity;
