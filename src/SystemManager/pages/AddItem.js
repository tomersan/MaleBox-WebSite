import FormFeild from '../../components/formFeild';
import React, { useState, useEffect, useRef } from 'react';
import LoginAdmin from '../components/LoginAdmin';
const data = require('../data/ColorsJson.json');
const AddItem = (props) => {


    const ifadmin = useRef([])
    const ifactive = useRef([])
    const [admin, setAdmin] = useState(null)

    const [Colors, setColors] = useState([])

    //יבוא קובץ הצבעים
    useEffect(() => {
        setColors(data);
    }, []);



useEffect(() => {


    if (props.location.state !== undefined) {
        let confirm = props.location.state.detail
        setConfirm(confirm)

    }
    if (localStorage.getItem('admin')) {

        setAdmin(JSON.parse(localStorage.getItem('admin')))
    }


}, [])


const [Item_Id, setItem_Id] = useState('')
const [Title, setTitle] = useState('')
const [sku, setSku] = useState('')
const [Item_Image, setItem_Image] = useState('')
const [Upload_By, setUpload_By] = useState('')
const [Price, setPrice] = useState('')

const [InStock, setInStock] = useState('')
const [itemtype, setitemtype] = useState('')
const [IsActive, setIsActive] = useState('')
const [Color, setColor] = useState('')
const [Sell_Price, setSell_Price] = useState('')
const [size, setSize] = useState('')
const [Description, setDescription] = useState('')
const [Category_Name, setCategory_Name] = useState('')


const [errTitle, setErrTitle] = useState(false)
const [errsku, setErrsku] = useState(false)
const [errItem_Image, setErrItem_Image] = useState(false)
const [errPrice, setErrPrice] = useState(false)
const [errDescription, setErrDescription] = useState(false)
const [errCategory_Name, setErrCategory_Name] = useState(false)
const [errsize, setErrSize] = useState(false)
const [errcolor, setErrColor] = useState(false)


const [AdditemConfirm, setAdditemConfirm] = useState(false)
const [Loader, setLoader] = useState(false)

const [confirm, setConfirm] = useState(false)

const additemFunc = async () => {
    setLoader(true)
    setAdditemConfirm(false)
    try {
        let item = {
            "Title": Title,
            "sku": sku,
            "Item_Image": Item_Image,
            "Upload_By": admin ? admin[0].User_id : '',
            "Price": Price,
            "InStock": InStock,
            "IsActive": ifactive.current.checked === true ? true : false,
            "Color": Color,
            "Sell_Price": Sell_Price,
            "size": size,
            "Description": Description,
            "Category_Name": Category_Name
        }

        let res = await fetch('/api/items/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)

        })
        let data = await res.json()

    }
    catch (err) { console.log(err) }
}


const CheckEdit = (e) => {
    e.preventDefault();
    setErrTitle(false)
    setErrsku(false)
    setErrItem_Image(false)
    setErrPrice(false)
    setErrColor(false)
    setErrSize(false)
    setErrDescription(false)
    setErrCategory_Name(false)

    let confirm = false;

    if (Title === '') {
        setErrTitle(true)
        confirm = true
    }
    if (sku === '') {
        setErrsku(true)
        confirm = true

    }
    if (Item_Image === '' || Item_Image === undefined) {
        setErrItem_Image(true)
        confirm = true

    }
    if (Price === '') {
        setErrPrice(true)
        confirm = true

    }
    if (Color === '') {
        setErrColor(true)
        confirm = true

    }
    if (size === '') {
        setErrSize(true)
        confirm = true

    }

    if (Description === '') {
        setErrDescription(true)
        confirm = true

    }
    if (Category_Name === '') {
        setErrCategory_Name(true)
        confirm = true
    }

    if (confirm === true) {
        return
    }
    additemFunc()
}

const uploadImage = (input) => { // העלאת תמונה והמרה לבייס 64
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            setItem_Image(e.target.result);
        }

        reader.readAsDataURL(input.files[0]); //convert to base64 string
    }
}


if (confirm !== null) {
    if (localStorage.getItem('admin')) {
        return (

            <>

                <div className="AdditemPage">
                    <div className="form-regiters">
                        <form action="" onSubmit={e => { CheckEdit(e) }}>
                            <h1>הוספת מוצר</h1>
                            <div className="fields">

                                <FormFeild className="feild" value={Title} type="text" name="(חובה) שם מוצר" action={setTitle} err={errTitle} />
                                <FormFeild className="feild" value={sku} type="text" name="(חובה) מק״ט" action={setSku} err={errsku} />
                                <FormFeild className="feild" value={Price} type="text" name="(חובה) מחיר" action={setPrice} err={errPrice} />
                                <FormFeild className="feild" value={InStock} type="text" name="כמות במלאי" action={setInStock} />
                                <FormFeild className="feild" value={Color} type="list" name="(חובה) צבע" listId="listOfColor" data={Colors} action={setColor} err={errcolor} />
                                <FormFeild className="feild" value={Sell_Price} type="text" name="מחיר אחרי הנחה" action={setSell_Price} />
                                <FormFeild className="feild" value={size} type="text" name="(חובה) מידות" action={setSize} err={errsize} />
                                <FormFeild className="feild" value={Description} type="text" name="(חובה) תיאור" action={setDescription} err={errDescription} />
                                <FormFeild className="feild" value={Category_Name} type="text" name="(חובה) קטגוריות" action={setCategory_Name} err={errCategory_Name} />
                                <h1>העלת תמונה</h1>
                                <FormFeild className="Input-image" value={Item_Image} type="text" name="תמונה (חובה)" action={uploadImage} targetImg={Item_Image} type="file" err={errItem_Image} />
                                <br />
                                <div className="ifactive">
                                    <input type="checkbox" checked ref={ifactive} /> <label> פעיל </label>
                                </div>

                                <button className="Btn-additem" type="submit">הוסף מוצר</button>
                            </div>
                            <div className="center">
                                <div className={Loader ? 'loader' : ''}></div>
                            </div>
                            <h2 className={AdditemConfirm ? 'confirmreg active' : 'confirmreg'}>! מוצר נוסף בהצלחה</h2>
                        </form >
                    </div>
                </div>

            </>
        )
    }
    else {
        return (
            <>
                <LoginAdmin></LoginAdmin>
            </>
        )
    }
}
else {
    return ""
}
}
export default AddItem;