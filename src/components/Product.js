import { BsHeart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {useHistory } from 'react-router-dom';
import{BsHeartFill} from "react-icons/bs"
const Product = (props) => {


    const Heart = (
        <BsHeart icon={BsHeart} />
    )
    const FillHeart = (
        <BsHeartFill icon={BsHeartFill} />
    )

    const history = useHistory()


    const addToWishList = (e) => {
        /*<Product key={item.Item_Id} name={item.Title} image={item.Item_Image} price={item.Price} id={item.Item_Id}> </Product>*/
        let NameOfItem = props.name
        let PriceOfItem = props.price
        let ItemDes = ''
        let ItemImage = props.image
        let id = props.id
        id = id.toString()

        let item = [{ NameOfItem, PriceOfItem, id, ItemDes, ItemImage}]

        if (localStorage.getItem('wishlist')) {

            let itemFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
            let ok = true

            for (let i = 0; i < itemFromLocalStorage.length; i++) {
                if (itemFromLocalStorage[i].id === id) {
                    itemFromLocalStorage = itemFromLocalStorage.filter(i => i.id !== id)
                    localStorage.setItem('wishlist', JSON.stringify(itemFromLocalStorage))
                    history.push(window.location.pathname)

                    return
                }
            }
            itemFromLocalStorage.push(null)
            itemFromLocalStorage[itemFromLocalStorage.length - 1] = item[0]
            localStorage.setItem('wishlist', JSON.stringify(itemFromLocalStorage))
            history.push(window.location.pathname)

        }
        else {

            localStorage.setItem('wishlist', JSON.stringify(item))
            history.push(window.location.pathname)
        }

    }
    return (
        <>
            <div className="item">
                <div className="item-header">
                    <Link to={"/products/" + props.id}>
                        <img src={props.image} alt=""/>
                    </Link>
                    <button className= "add-to-wish-list-btn" onClick={(e) => addToWishList(e.target)}>{props.inWishList === true ? FillHeart : Heart} </button>

                </div>
                <div className="item-footer">
                    <div className="item-name">
                        <Link to={"/products/" + props.id}>{props.name}</Link>
                    </div>
                    <div className="item-price">
                        <h6>{props.price + " ₪"}</h6>
                    </div>
                </div>
            </div>
        </>
    )

}


export default Product;