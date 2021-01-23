import classes from "./nav.module.css"

 
function nav(props) {
    return(
        <nav className={classes.nav}>
            <ul className={classes.nav_list}>
                <li>profile</li>
                <li>log out</li>
            </ul>
        </nav>
    )
}
export default nav
