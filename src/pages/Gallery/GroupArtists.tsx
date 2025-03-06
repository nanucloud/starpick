import React, { useState, useEffect } from "react";
import { User, Music, Calendar, Globe, Instagram, Youtube, Loader } from "lucide-react";

// API 응답 타입 정의
interface Artist {
  id: string;
  name: string;
  stageName: string;
  birthdate: string;
  position: string;
  imageUrl: string;
  instagramId?: string;
  youtubeId?: string;
  bio: string;
}

interface GroupInfo {
  id: string;
  name: string;
  debutDate: string;
  company: string;
  description: string;
  memberCount: number;
}

const ArtistProfile: React.FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <div className="flex flex-col md:flex-row border border-blue-100 rounded-lg p-4 mb-4 hover:shadow-md transition-all duration-200 bg-white">
      <div className="w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-0 md:mr-6">
        <img
          src={artist.imageUrl}
          alt={`${artist.name} 프로필 사진`}
          className="w-full h-auto rounded-lg object-cover aspect-square"
        />
        
        <div className="flex space-x-2 mt-3 justify-center">
          {artist.instagramId && (
            <a
              href={`https://instagram.com/${artist.instagramId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-indigo-50 rounded-full text-indigo-500 hover:bg-indigo-100 transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
          {artist.youtubeId && (
            <a
              href={`https://youtube.com/channel/${artist.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-indigo-50 rounded-full text-indigo-500 hover:bg-indigo-100 transition-colors"
            >
              <Youtube size={20} />
            </a>
          )}
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <h3 className="text-xl font-bold text-gray-800">{artist.stageName}</h3>
          <span className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-600 text-xs rounded-full">
            {artist.position}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <User size={16} className="mr-2 text-indigo-400" />
            <span className="font-medium mr-2">본명:</span> {artist.name}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-indigo-400" />
            <span className="font-medium mr-2">생년월일:</span> {artist.birthdate}
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="font-medium text-gray-700 mb-2">소개</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{artist.bio}</p>
        </div>
      </div>
    </div>
  );
};

const GroupArtists: React.FC = () => {
  // 상태 관리
  const [artists, setArtists] = useState<Artist[]>([]);
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("전체 멤버");
  
  const filters = ["전체 멤버", "연령순", "이름순"];

  // API 호출 시뮬레이션
  useEffect(() => {
    // 실제 구현에서는 fetch나 axios 사용
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // API 호출 시뮬레이션 (지연시간 추가)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 더미 데이터 (실제로는 API 응답)
        const dummyArtists: Artist[] = [
          {
            id: "1",
            name: "안유진",
            stageName: "안유진 (Yujin)",
            birthdate: "2003.09.01",
            position: "리더, 메인보컬",
            imageUrl: "/dummy.png?1",
            instagramId: "yuji_an_",
            youtubeId: "UC3vMH2HaoXFzpLG8xQR_zVA",
            bio: "아이브의 리더이자 메인보컬을 맡고 있는 안유진은 IZ*ONE 출신으로, 뛰어난 가창력과 무대 매너로 많은 사랑을 받고 있습니다. 또한 예능감과 친화력이 좋아 여러 방송에서도 활약하고 있습니다."
          },
          {
            id: "2",
            name: "가을",
            stageName: "가을 (Gaeul)",
            birthdate: "2002.09.24",
            position: "리드래퍼, 리드댄서",
            imageUrl: "/dummy.png?2",
            instagramId: "gaeul.__.1",
            bio: "아이브의 리드래퍼이자 리드댄서를 맡고 있는 가을은 탄탄한 실력과 카리스마 있는 무대 매너가 특징입니다. 특유의 차분하고 성숙한 이미지로 많은 팬들의 사랑을 받고 있습니다."
          },
          {
            id: "3",
            name: "레이",
            stageName: "레이 (Rei)",
            birthdate: "2004.02.03",
            position: "서브보컬, 서브래퍼",
            imageUrl: "/dummy.png?3",
            instagramId: "rei_jjang",
            youtubeId: "UCpRXCTyNNa_JSeQKnU2olag",
            bio: "일본 출신의 레이는 밝고 에너제틱한 성격으로 팀 내 분위기 메이커 역할을 맡고 있습니다. 특유의 귀여운 매력과 더불어 실력까지 갖춰 글로벌 팬들에게 많은 사랑을 받고 있습니다."
          },
          {
            id: "4",
            name: "장원영",
            stageName: "장원영 (Wonyoung)",
            birthdate: "2004.08.31",
            position: "센터, 리드보컬, 비주얼",
            imageUrl: "/dummy.png?4",
            instagramId: "_jang_wonyoung",
            youtubeId: "UCFk7imyPqLvrCEqs66N0hHg",
            bio: "IZ*ONE 출신의 장원영은 아이브의 센터이자 비주얼을 담당하고 있습니다. 독보적인 비주얼과 몰입도 높은 표현력으로 많은 사랑을 받고 있으며, 다양한 CF와 방송에서 활약하고 있습니다."
          },
          {
            id: "5",
            name: "리즈",
            stageName: "리즈 (Liz)",
            birthdate: "2004.11.21",
            position: "메인래퍼, 리드댄서",
            imageUrl: "/dummy.png?5",
            instagramId: "liz_izone",
            bio: "아이브의 메인래퍼이자 리드댄서인 리즈는 탄탄한 실력과 귀여운 외모로 많은 사랑을 받고 있습니다. 특유의 밝은 에너지와 친근한 매력으로 팬들에게 인기가 많습니다."
          },
          {
            id: "6",
            name: "이서",
            stageName: "이서 (Leeseo)",
            birthdate: "2007.02.21",
            position: "메인댄서, 서브보컬",
            imageUrl: "/dummy.png?6",
            instagramId: "is_leeseo",
            youtubeId: "UCk0NU_s8ZrOppFNgTDJ5Efg",
            bio: "아이브의 막내이자 메인댄서인 이서는 어린 나이에도 불구하고 뛰어난 무대 매너와 안정적인 실력을 보여주고 있습니다. 특유의 청순한 매력과 성장 가능성으로 많은 주목을 받고 있습니다."
          }
        ];

        const dummyGroupInfo: GroupInfo = {
          id: "ive",
          name: "아이브 (IVE)",
          debutDate: "2021.12.01",
          company: "스타쉽 엔터테인먼트",
          description: "아이브(IVE)는 2021년 12월 1일에 데뷔한 스타쉽 엔터테인먼트 소속의 6인조 걸그룹입니다. 멤버는 안유진, 가을, 레이, 장원영, 리즈, 이서로 구성되어 있으며, 'ELEVEN', 'LOVE DIVE', 'After LIKE' 등의 히트곡으로 신인 걸그룹 중 가장 빠르게 성장한 그룹으로 자리매김했습니다. 특히 '완성형 아이돌'이라는 수식어와 함께 데뷔와 동시에 음악 방송 1위, 각종 신인상을 휩쓸며 4세대 대표 걸그룹으로 주목받고 있습니다.",
          memberCount: 6
        };

        setArtists(dummyArtists);
        setGroupInfo(dummyGroupInfo);
        setLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // 필터에 따른 멤버 정렬
  const filteredArtists = [...artists].sort((a, b) => {
    if (activeFilter === "연령순") {
      return new Date(a.birthdate.replace(/\./g, "-")) > new Date(b.birthdate.replace(/\./g, "-")) ? 1 : -1;
    } else if (activeFilter === "이름순") {
      return a.name.localeCompare(b.name, 'ko');
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="text-center">
          <Loader size={40} className="mx-auto text-indigo-500 animate-spin mb-4" />
          <p className="text-gray-600">멤버 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 p-4 rounded-lg text-center my-10">
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm"
          onClick={() => window.location.reload()}
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center w-full justify-between">
        <div className="flex space-x-2 overflow-x-auto flex-1">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                activeFilter === filter
                  ? "bg-[#1f1f1f] text-white"
                  : "bg-white border border-black-800 text-gray-700"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <a 
          href="https://ive-starship.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-indigo-400 hover:bg-indigo-500 text-white rounded-full text-sm"
        >
          <Globe size={14} className="mr-1" />
          공식 사이트
        </a>
      </div>

      <div className="space-y-6">
        {filteredArtists.map((artist) => (
          <ArtistProfile key={artist.id} artist={artist} />
        ))}
      </div>

      {groupInfo && (
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{groupInfo.name} 소개</h3>
          <div className="text-gray-600 text-sm space-y-2">
            <p className="flex items-center">
              <Music size={16} className="mr-2 text-indigo-400" />
              <span className="font-medium mr-2">데뷔일:</span> {groupInfo.debutDate}
            </p>
            <p className="flex items-center">
              <User size={16} className="mr-2 text-indigo-400" />
              <span className="font-medium mr-2">소속사:</span> {groupInfo.company}
            </p>
            <p className="leading-relaxed mt-2">{groupInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupArtists;