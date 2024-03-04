import { useMemo } from "react";
import styling from "./routing.module.css";
import logo from "../assets/codecraft.svg";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();

    const sections = useMemo(() => {
        const temp = ["home", "students", "courses"];
        if (user && user.user_type === "TEACHER") {
            temp.splice(2, 0, "teachers");
        }
        return temp;
    }, [user]);

    if (!user) return <></>;

    return (
        <div className={styling.sidebarMain}>
            <div className={styling.sidebarLogo}>
                <img src={logo} />
                <h2>CodeCraft Academy</h2>
            </div>
            <h3 className={styling.sidebarMenu}>Menu</h3>
            <div className={styling.sidebarDivider}></div>
            <div className={styling.sections}>
                {sections.map((section) => (
                    <a
                        href={`/${section}`}
                        className={pathname === "/" + section ? styling.activeSection : ""}
                    >
                        <h3>{section.slice(0, 1).toUpperCase() + section.slice(1)}</h3>
                    </a>
                ))}
            </div>
            <div className={styling.filler}></div>
            <a href="/profile" className={styling.profile}>
                <img />
                <h2>
                    {user.first_name} {user.last_name}
                </h2>
            </a>
        </div>
    );
};

export default Sidebar;
