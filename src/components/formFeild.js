
const FormField = (props) => {

    const ifimage = () => {
        //props=נתונים שמועברים לקומפוננטה מקופמפוננטה אחרת 
        if (props.targetImg === "") {//  בדיקה אם לא העלו עדיין תמונה
            return ""
        }
        else {// אם כן העלו תמונה יחזיר את התמונה
            return props.targetImg
        }
    }


    // בדיקה מה סוג הקובץ 
    switch (props.type) {
        case 'list':// אם התיבה היא מסוג רשימה נחבר לה את רשימת הצבעים.
            return (
                <div className="field-color">
                    <label className="label">{props.name}</label>
                    <select id={props.listId} >
                        {props.data.map(item => <option value={item.name}> {item.name} </option>)} {/*הצגת כל הצבעים ברשימה */}
                    </select>
                    
                </div>
            )
        case 'file':// אם התיבה היא מסוג קובץ
            if (ifimage() !== "") {// הפעלת הבדיקה אם יש תמונה או אין 
                return (
                    <div className={props.className}> {/* אם יש תמונה יחזיר את התמונה מתחת לתיבה  */}
                        <input className="InputImage" placeholder={props.name} type={props.type} onChange={(event) => { props.action(event.target) }}></input>
                        <img className="img-upload" src={props.targetImg} alt="" />
                    </div>
                )
            }
            else {// במידה ואין תמונה לא נתמש בכלל  תמונה 
                return <div className={props.className}>
                    <input placeholder={props.name} type={props.type} onChange={(event) => { props.action(event.target) }}></input>
                </div>
            }

        default:
            return (// מחזיר את כל מה שהוא לא תמונה או קובץ
                <div className={props.className}>
                    <label className="label">{props.name}</label>
                    <input className={props.err ? 'err' : 'feild1'} type={props.type} value={props.value ? props.value : ''} onInput={(event) => { props.action(event.target.value) }} />
                </div>
            )
    }
}

export default FormField;