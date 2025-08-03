import "./MainPage.css";
import { useId } from "react";
import { SideBar, TodoPageComponent } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedSideBarLabelId } from "../../store/Features/SideBarSlice";
const MainPage = () => {
    const { pageType, pageId } = useParams();
    const dispatch = useDispatch();
    let SideBarDefaultLabels, SideBarCustomLists, pageContainer;

    dispatch(setSelectedSideBarLabelId(pageId));

    if (pageType === "notes") {
        // nothing yet
    } else {
        SideBarDefaultLabels = [
            { title: "Today", icon: "IconCalendarToday", id: "today" }, // Later we will retrieve id from backend , id will help to organise tasks easily among labels
            { title: "Inbox", icon: "IconInbox", id: "inbox" },
            { title: "Upcoming", icon: "IconCalendar1", id: "upcoming" },
        ];

        SideBarCustomLists = {
            Heading: "My Projects",
            HeadingId: useId(),
            Lists: [
                { title: "Getting Started", icon: "IconList2", id: useId() },
            ],
        };

        pageContainer = <TodoPageComponent />;
    }

    return (
        <div className="MainPage">
            <SideBar
                SideBarDefaultLabels={SideBarDefaultLabels}
                SideBarCustomLists={SideBarCustomLists}
            />

            <div className="MainPageContainer">
                {pageContainer}
            </div>
        </div>
    );
};

export default MainPage;
