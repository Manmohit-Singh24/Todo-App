import './MainPage.css';
import { SideBar, TodoPageComponent } from '../../components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoTags, setTodos } from '../../store/Features/TodoSlice';
import todoService from '../../services/TodoServices';
import { useEffect, useState } from 'react';
const MainPage = () => {
    const { pageType } = useParams();
    const dispatch = useDispatch();
    const [pageContainer, setPageContainer] = useState(<></>);

    let email = useSelector((state) => state.AuthData.Email);
    let token = useSelector((state) => state.AuthData.Token);

    useEffect(() => {
        (async () => {
            if (pageType === 'todo') {
                const { message, success, data } = await todoService.fetchTodos({
                    email,
                    token,
                });

                if (success) {                    
                    dispatch(setTodos({ Todos: data.todos }));
                    dispatch(setTodoTags({ Tags: data.tags }));
                    setPageContainer(<TodoPageComponent />);
                }
            }
            
        })();
    }, [pageType, email, token]);

    return (
        <div className="MainPage">
            <SideBar />
            <div className="MainPageContainer">{pageContainer}</div>
        </div>
    );
};

export default MainPage;
