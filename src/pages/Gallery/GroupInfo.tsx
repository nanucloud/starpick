import React from "react";

interface GroupInfoProps {
  groupInfo: {
    name: string;
    description: string;
    fanCount: number;
  };
}

const GroupInfo: React.FC<GroupInfoProps> = ({ groupInfo }) => {
  const administrators = [
    {
      id: 1,
      username: "iveLover123",
      role: "갤러리 주인",
      joinDate: "2023년 5월 15일",
      postCount: 328,
    },
    {
      id: 2,
      username: "starPick_Admin",
      role: "StarPick 운영자",
      joinDate: "2023년 1월 1일",
      postCount: 57,
    },
    {
      id: 3,
      username: "iveOfficial",
      role: "공식 계정",
      joinDate: "2023년 3월 22일",
      postCount: 145,
    },
    {
      id: 4,
      username: "fanClubPresident",
      role: "팬클럽 회장",
      joinDate: "2023년 6월 10일",
      postCount: 253,
    },
  ];

  const handleReport = () => {
    alert("신고 기능이 추가될 예정입니다.");
  };

  return (
    <div className="bg-white rounded-lg mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">갤러리 정보</h2>
        <button
          onClick={handleReport}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          신고하기
        </button>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          기본 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">그룹명</span>
            <span className="font-medium">{groupInfo.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">팬 수</span>
            <span className="font-medium">
              {groupInfo.fanCount.toLocaleString()}명
            </span>
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <span className="text-sm text-gray-500">설명</span>
            <span className="font-medium">{groupInfo.description}</span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          갤러리 관리자
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사용자명
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  역할
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  게시글 수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {administrators.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {admin.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {admin.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        admin.role === "갤러리 주인"
                          ? "bg-purple-100 text-purple-800"
                          : admin.role === "StarPick 운영자"
                          ? "bg-blue-100 text-blue-800"
                          : admin.role === "공식 계정"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.postCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      메시지
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          StarPick 그룹 방침
        </h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>팬들끼리 서로 존중하는 마음을 가집시다.</li>
            <li>불법적인 콘텐츠나 저작권을 침해하는 게시물을 올리지 마세요.</li>
            <li>멤버에 대한 비방, 악성 루머 유포는 금지됩니다.</li>
            <li>
              다른 팬덤 또는 아티스트를 비하하는 글은 삭제 조치될 수 있습니다.
            </li>
            <li>갤러리 관리자의 지시에 따라주세요.</li>
          </ol>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          StarPick 안내사항
        </h3>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-blue-800">
            이 갤러리는 팬들이 자유롭게 소통할 수 있는 공간입니다. 문제가 있거나
            신고할 내용이 있으면 우측 상단의 '신고하기' 버튼을 눌러주세요. 추가
            문의사항은 StarPick 고객센터(help@starpick.com)로 연락해주세요.
          </p>
        </div>
      </section>
    </div>
  );
};

export default GroupInfo;
