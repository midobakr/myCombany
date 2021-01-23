import classes from "./button.module.css";

function Button({name , onSubmit}) {

    return(
        <button className={classes.button} onClick={onSubmit}>{name}</button>   
    )
}

export default Button