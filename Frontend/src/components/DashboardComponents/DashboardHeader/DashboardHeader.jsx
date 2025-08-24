import "./DashboardHeader.css";
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../../utils/Icons";
import { setView, showAddSection } from "../../../store/Features/TodoSlice";
import { useParams } from "react-router-dom";
const DashboardHeader = () => {
    const dispatch = useDispatch();
    const { pageType, tagId } = useParams();
    const view = useSelector((state) => state.TodoData.View);

    const changeView = () => {
        const newView = view === "List" ? "Board" : "List";
        dispatch(setView({ View: newView }));
    };

    return (
        <header className="DashboardHeaderContainer">
            {pageType === "todo" && (
                <>
                    {tagId !== "today" && (
                        <button
                            className="DashboardHeaderAddSectionButton"
                            onClick={() => dispatch(showAddSection({ visibleAddSection: true }))}
                        >
                            <div className="DashboardHeaderIcon">
                                <Icon name={"IconAddSection"} size={"S"} />
                            </div>
                            Add Section
                        </button>
                    )}

                    <button
                        className={`DashboardHeaderViewButton ${view}View`}
                        onClick={changeView}
                    >
                        <div className="DashboardHeaderIcon">
                            <Icon name={"IconListView"} size={"S"} />
                        </div>
                        Display
                    </button>
                </>
            )}
        </header>
    );
};

export default DashboardHeader;
