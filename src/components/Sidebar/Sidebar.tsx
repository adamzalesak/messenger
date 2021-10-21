import './Sidebar.css';

const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar__logo">M</div>
        <ul className="menu">
            <li className="menu__item">
                <button className="button">
                    <img className="button__icon button__icon--sidebar" alt="message" src="/icons/message-desktop.svg" />
                </button>
            </li>
            <li className="menu__item">
                <button className="button">
                    <img className="button__icon button__icon--sidebar" alt="contacts" src="/icons/contacts-desktop.svg" />
                </button>
            </li>
            <li className="menu__item menu__item--down">
                <button className="button">
                    <img className="button__icon button__icon--sidebar" alt="dark mode" src="/icons/dark-mode-desktop.svg" />
                </button>
            </li>
        </ul>
    </div>
);

export default Sidebar;