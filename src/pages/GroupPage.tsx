import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/Header";
import FilterGroup from "../components/group/GroupFilter";
import GroupHeader from "../components/group/GroupHeader";
import GroupPhotoGallery from "../components/group/GroupPhotoGallery";
import GroupNavigation from "../components/group/GroupNavigation";
import GroupCommunity from "./Gallery/GroupCommunity";
import GroupArtists from "./Gallery/GroupArtists";
import GroupInfo from "./Gallery/GroupInfo";
import { Loader } from "lucide-react";
import Footer from './../components/common/Footer';

interface GroupData {
  id: string;
  name: string;
  description: string;
  fanCount: number;
}

interface Photo {
  id: string;
  src: string;
  alt: string;
}

const GroupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupName } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [groupInfo, setGroupInfo] = useState<GroupData | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("MMA 2023");
  const [selectedYear, setSelectedYear] = useState("2023");

  const events = ["MMA 2023", "MAMA 2023"];
  const years = ["2023", "2022"];

  const getActiveTabFromPath = (path: string) => {
    if (path.includes("/otherinfo")) {
      return "기타 정보";
    } else if (path.includes("/community")) {
      return "커뮤니티";
    } else if (path.includes("/artists")) {
      return "아티스트";
    } else {
      return "갤러리";
    }
  };

  const [activeTab, setActiveTab] = useState(() => 
    getActiveTabFromPath(location.pathname)
  );

  useEffect(() => {
    const fetchGroupData = async () => {
      if (!groupName) return;

      setLoading(true);
      setError(null);

      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const groupData = {
          id: groupName,
          name: groupName === "ive" ? "아이브 (IVE)" : "그룹명",
          description: `${groupName}의 StarPick 그룹입니다.`,
          fanCount: 488
        };

        const dummyPhotos = Array.from({ length: 15 }, (_, i) => ({
          id: String(i + 1),
          src: `/dummy.png?id=${i + 1}`,
          alt: `${groupData.name} 사진 ${i + 1}`
        }));

        setGroupInfo(groupData);
        setPhotos(dummyPhotos);
        setLoading(false);
      } catch (err) {
        console.error("그룹 데이터 로딩 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupName]);

  const handleTabChange = (tab: string) => {
    if (!groupName) return;
    
    let path = `/${groupName}`;
    
    if (tab === "커뮤니티") {
      path += "/community";
    } else if (tab === "아티스트") {
      path += "/artists";
    } else if (tab === "기타 정보") {
      path += "/otherinfo";
    } else {
      path += "/gallery";
    }
    
    if (location.pathname !== path) {
      setActiveTab(tab);
      navigate(path);
    }
  };

  useEffect(() => {
    const newActiveTab = getActiveTabFromPath(location.pathname);
    
    if (newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
    }
  }, [location.pathname, activeTab]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const tabs = ["갤러리", "커뮤니티", "아티스트", "기타 정보"];

  const renderTabContent = () => {
    if (loading || !groupInfo) {
      return (
        <div className="w-full flex justify-center items-center py-20">
          <div className="text-center">
            <Loader size={40} className="mx-auto text-indigo-500 animate-spin mb-4" />
            <p className="text-gray-600">그룹 정보를 불러오는 중입니다...</p>
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

    switch (activeTab) {
      case "갤러리":
        return (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:pr-6">
              <GroupPhotoGallery photos={photos} />
            </div>

            <div className="w-full md:w-1/4">
              <div className="md:hidden mb-8 space-y-6">
                <FilterGroup
                  title="최근 이벤트"
                  options={events}
                  selectedOption={selectedEvent}
                  onOptionChange={setSelectedEvent}
                />

                <FilterGroup
                  title="연도별"
                  options={years}
                  selectedOption={selectedYear}
                  onOptionChange={setSelectedYear}
                />
              </div>

              <div className="hidden md:block space-y-6 sticky top-4">
                <FilterGroup
                  title="최근 이벤트"
                  options={events}
                  selectedOption={selectedEvent}
                  onOptionChange={setSelectedEvent}
                />

                <FilterGroup
                  title="연도별"
                  options={years}
                  selectedOption={selectedYear}
                  onOptionChange={setSelectedYear}
                />
              </div>
            </div>
          </div>
        );
      case "커뮤니티":
        return <GroupCommunity />;
      case "아티스트":
        return <GroupArtists />;
      case "기타 정보":
        return <GroupInfo groupInfo={groupInfo} />;
      default:
        return <GroupPhotoGallery photos={photos} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {groupInfo && (
          <GroupHeader
            name={groupInfo.name}
            description={groupInfo.description}
            fanCount={groupInfo.fanCount}
            isFollowing={isFollowing}
            onFollowToggle={handleFollowToggle}
          />
        )}

        <GroupNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {renderTabContent()}
      </main>
      <Footer/>
    </div>
  );
};

export default GroupPage;