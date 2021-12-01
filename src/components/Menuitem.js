const selectedMenu = "Home";
function MenuItem(props) {
    return (
        <button href={"#" + props.item.toString()} className={(props.item.toString() === selectedMenu.toString()) ? "menuitem active" : "menuitem"} >
            {props.item}
        </button >
    )
}

export default MenuItem;