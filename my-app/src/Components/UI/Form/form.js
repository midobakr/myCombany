import classes from "./form.module.css";
import Button from "../Button/button";

function Form({title , items ,onSubmit}) {    
    
    return(
        <div className={classes.container}>
            <form onSubmit={onSubmit}>
            <h1 className={classes.title}>{title}</h1>
            { items.map((item)=>    
                    
                <div className={classes.formgroup}>
                <label for={item.name}>{item.name}:</label>
                <input value={item.value} style={!!item.error? {border:'2px solid red'}:{}} minLength={item.type==='password'? '8':''} required onChange={item.saveInputData.bind(this , item.type)}  className={classes.input} type={item.type.search(/pass/)===0 ? 'password' : item.type} placeholder={item.placeholder}/>
                </div>
            )
            }
            <Button name={title} />
            </form>
        </div>
        )
}

export default Form