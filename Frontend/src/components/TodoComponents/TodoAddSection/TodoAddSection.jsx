import { useDispatch, useSelector } from "react-redux";
import "./TodoAddSection.css";
import { addSection, showAddSection } from "../../../store/Features/TodoSlice";
import { useEffect, useRef, useState } from "react";
import Icon from "../../../utils/Icons";
import { useParams } from "react-router-dom";

const TodoAddSection = () => {
    const dispatch = useDispatch();
    const view = useSelector((state) => state.TodoData.View);
    const { tagId } = useParams();

    const visibleAddSection = useSelector((state) => state.TodoData.visibleAddSection);

    const [newSectionName, setNewSectionName] = useState("");
    const inputRef = useRef(null);

    const cancelAddingTask = () => {
        setNewSectionName("");
        dispatch(showAddSection({ visibleAddSection: false }));
    };

    const addNewSection = () => {
        if (!visibleAddSection) {
            dispatch(showAddSection({ visibleAddSection: true }));
            return;
        }

        else if (newSectionName) {
            const sectionId = newSectionName.replace(" ", "-") + "-" + Date.now().toPrecision(5);
            dispatch(
                addSection({
                    sectionId: sectionId,
                    section: {
                        sectionName: newSectionName,
                        tagId: tagId,
                    },
                }),
            );
        }
        cancelAddingTask();
    };

    useEffect(() => {
        if (visibleAddSection) {
            inputRef.current.focus();
        }
    }, [visibleAddSection]);

    return (
        <div className={`TodoAddSection ${visibleAddSection ? "Active" : "Collapsed"} ${view}View`}>
            <div className="TodoAddSectionContainer">
                <input
                    ref={inputRef}
                    type="text"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addNewSection();
                    }}
                />

                <div className="TodoAddSectionButtons">
                    <button className="TodoAddSectionCancelButton" onClick={cancelAddingTask}>
                        <Icon name={"IconPlusFilled"} size={"M"} />
                        Cancel
                    </button>

                    <button className="TodoAddSectionSaveButton" onClick={addNewSection}>
                        {visibleAddSection ? (
                            <Icon name={"IconAddSectionFilled"} size={"M"} />
                        ) : (
                            <Icon name={"IconAddSection"} size={"M"} />
                        )}
                        Add Section
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoAddSection;
