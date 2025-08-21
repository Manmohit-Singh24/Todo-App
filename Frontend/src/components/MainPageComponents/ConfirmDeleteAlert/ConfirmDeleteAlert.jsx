import "./ConfirmDeleteAlert.css";
import { useSelector, useDispatch } from "react-redux";
import { clearConfirmDelete } from "../../../store/Features/GeneralSlice";
import { useParams } from "react-router-dom";
import { deleteSection, deleteTag, deleteTodo } from "../../../store/Features/TodoSlice";
import { useNavigate } from "react-router-dom";
const ConfirmDeleteAlert = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showConfirmDeleteAlert = useSelector((state) => state.GeneralData.showConfirmDelete);
    const {tagId} = useParams();
    const confirmDelete = () => {
        const target = showConfirmDeleteAlert.target;
        const targetId = showConfirmDeleteAlert.targetId;

        if (target === "todo") {
            dispatch(deleteTodo({ todoId: targetId }));
        } else if (target === "section") {
            dispatch(deleteSection({ sectionId: targetId }));
        } else if (target === "tag") {
            dispatch(deleteTag({ tagId: targetId }));
            if (tagId === targetId) navigate("/app/todo/today");
        }

        dispatch(clearConfirmDelete());
    };

    return (
        <>
            {showConfirmDeleteAlert.show && (
                <div className="ConfirmDeleteAlertBackground">
                    <div className="ConfirmDeleteAlertContainer">
                        <p dangerouslySetInnerHTML={{ __html: showConfirmDeleteAlert.title }} />
                        <button
                            className="ConfirmDeleteAlertCancel"
                            onClick={() => dispatch(clearConfirmDelete())}
                        >
                            Cancel
                        </button>
                        <button className="ConfirmDeleteAlertDelete" onClick={confirmDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default ConfirmDeleteAlert;
