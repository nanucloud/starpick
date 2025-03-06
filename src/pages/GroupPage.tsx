import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import FilterGroup from "../components/group/GroupFilter";
import GroupHeader from "../components/group/GroupHeader";
import GroupPhotoGallery from "../components/group/GroupPhotoGallery";
import GroupNavigation from "../components/group/GroupNavigation";
import GroupCommunity from "./Gallery/GroupCommunity";
import GroupArtists from "./Gallery/GroupArtists";

const GroupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL에서 현재 경로 확인
  const getActiveTabFromPath = (path: string) => {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (lastSegment) {
      case "community":
        return "커뮤니티";
      case "artists":
        return "아티스트";
      case "info":
        return "기타 정보";
      case "gallery":
      default:
        return "갤러리";
    }
  };

  const [activeTab, setActiveTab] = useState(() =>
    getActiveTabFromPath(location.pathname)
  );
  const [selectedEvent, setSelectedEvent] = useState("MMA 2025");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isFollowing, setIsFollowing] = useState(false);

  const groupInfo = {
    name: "아이브 (IVE)",
    description: "아이브의 StarPick 그룹입니다. 그리고 이건 설명이죠 하하",
    fanCount: 488
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // 여기에 실제 팔로우/언팔로우 API 호출 로직을 추가할 수 있습니다
  };

  const photos = [
    { id: "1", src: "/dummy.png", alt: "아이돌 사진 1" },
    { id: "2", src: "/dummy.png?2", alt: "아이돌 사진 2" },
    { id: "3", src: "/dummy.png?3", alt: "아이돌 사진 3" },
    { id: "4", src: "/dummy.png?4", alt: "아이돌 사진 4" },
    { id: "5", src: "/dummy.png?5", alt: "아이돌 사진 5" },
    { id: "6", src: "/dummy.png?6", alt: "아이돌 사진 6" },
    { id: "7", src: "/dummy.png?7", alt: "아이돌 사진 7" },
    { id: "8", src: "/dummy.png?8", alt: "아이돌 사진 8" },
    { id: "9", src: "/dummy.png?9", alt: "아이돌 사진 9" },
    { id: "10", src: "/dummy.png?10", alt: "아이돌 사진 10" },
    { id: "11", src: "/dummy.png?11", alt: "아이돌 사진 11" },
    { id: "12", src: "/dummy.png?12", alt: "아이돌 사진 12" },
    { id: "10", src: "/dummy.png?10", alt: "아이돌 사진 10" },
    { id: "11", src: "/dummy.png?11", alt: "아이돌 사진 11" },
    { id: "12", src: "/dummy.png?12", alt: "아이돌 사진 12" },
  ];

  const tabs = ["갤러리", "커뮤니티", "아티스트", "기타 정보"];
  const events = ["MMA 2025"];
  const years = ["2025", "2024", "2023", "2022"];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    let path = "/ive";
    switch (tab) {
      case "커뮤니티":
        path += "/community";
        break;
      case "아티스트":
        path += "/artists";
        break;
      case "기타 정보":
        path += "/otherinfo";
        break;
      default:
        path += "/gallery";
        break;
    }

    navigate(path);
  };

  useEffect(() => {
    const newActiveTab = getActiveTabFromPath(location.pathname);
    if (newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
    }
  }, [location.pathname]);

  const renderTabContent = () => {
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

              {/* Filters for desktop */}
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
        return <div>그룹 정보가 여기에 표시됩니다.</div>;
      default:
        return <GroupPhotoGallery photos={photos} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <GroupHeader
          name={groupInfo.name}
          description={groupInfo.description}
          fanCount={groupInfo.fanCount}
          isFollowing={isFollowing}
          onFollowToggle={handleFollowToggle}
        />

        <GroupNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {renderTabContent()}
      </main>
    </div>
  );
};

export default GroupPage;