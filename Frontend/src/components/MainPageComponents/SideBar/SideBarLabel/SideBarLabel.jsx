import './SideBarLabel.css';
const SideBarLabel = ({
    title = 'SideBarLabel',
    icon = '',
    number = ' ',
    id,
    selected = false,
    onClick = () => {},
}) => {

    let className = `SideBarLabelContainer ${selected ? 'SideBarLabelSelected' : ' '}`;

    return (
        <button onClick={onClick} className={className} id={id}>
            {icon}
            <span className={`SideBarLabelTitle`}>{title}</span>
            {number && <span className="SideBarLabelNumber">{number}</span>}
        </button>
    );
};

export default SideBarLabel;
