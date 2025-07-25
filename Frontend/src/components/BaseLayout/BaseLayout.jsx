import "./BaseLayout.css";
import SideBar from "./SideBar/SideBar.jsx";

const BaseLayout = ({
    SideBarLabels = [],
    SideBarUserListsHeading,
    SideBarUsersLists = [],
    pageContainer = <></>,
}) => {
    return (
        <div className="BaseLayoutContainer">
            <SideBar SideBarLabels SideBarUserListsHeading SideBarUsersLists />
            <div className="BaseLayoutContent">
                <header className="BaseLayoutHeader"></header>
                <main className="BaseLayoutMain">{pageContainer}</main>
                <footer className="BaseLayoutFooter"></footer>
            </div>
        </div>
    );
};

export default BaseLayout;
