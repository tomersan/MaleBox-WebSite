import { Container, Row, Col, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom"
import ImageGallery from 'react-image-gallery';
import { useRef, useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineMinus } from 'react-icons/ai'
import { BsHeart } from "react-icons/bs";
import { Link, useHistory } from 'react-router-dom';
import MyCart from '../components/MyCart';



const ProductPage = () => {

  // id paramter from url 
  const { id } = useParams()
  const history = useHistory()

  //variables
  const [currentColor, setCurrentColor] = useState('')
  const [currentSize, setCurrentSize] = useState('')
  const [items, setItems] = useState(null);
  const [quantity, setQuantity] = useState(1);



  const [CartModal, setCartModal] = useState(false);

  const OpenCart = (event) => {
    if (!CartModal) {
        setCartModal(true);
    }
    else
        setCartModal(false);
}


  // quantity between 1-10 
  if (quantity < 1) {
    setQuantity(1)
  }
  if (quantity > 10) {
    setQuantity(10)
  }
  // load items from db
  const LoadItems = async () => {
    try {
      let res = await fetch('/api/items/' + id, { method: 'GET' })
      let data = await res.json()
      return data
      // setItems(data)
    }
    catch (err) { console.log(err) }
  }

  let thisProduct = items;

  // find current item in array items from db
  // if (items !== null) {
  //   for (let i = 0; i < items.length; i++) {
  //     if (Number(items[i].Item_Id) === Number(id)) {
  //       thisProduct = items[i]
  //       break
  //     }
  //   }
  // }


  useEffect(() => {

    LoadItems().then(data => {
      setItems(data)
    })

  }, [])


  // set icons 
  const Pluse = (
    <AiOutlinePlus />
  )
  const Minus = (
    <AiOutlineMinus />
  )
  const Heart = (
    <BsHeart />
  )

  // referene to button of Color and Size 
  const ButtonsColor = useRef([]) //array of color buttons
  const ButtonsSize = useRef([]) //array of size buttons

  // function for select and change item color
  const changeColor = (e) => {
    for (let i = 0; i < ButtonsColor.current.length; i++) {
      if (ButtonsColor.current[i] === e) {
        e.classList.add('active')
        setCurrentColor(e.value)
      }
      else {
        ButtonsColor.current[i].classList.remove('active')
      }
    }

  }

  // function for select and change item size
  const changeSize = (e) => {
    for (let i = 0; i < ButtonsSize.current.length; i++) {
      if (ButtonsSize.current[i] === e) {
        e.classList.add('active')
        setCurrentSize(e.value)
      }
      else {
        ButtonsSize.current[i].classList.remove('active')
      }
    }

  }

  //function check if all the fields is not empty
  const CheckField = () => {
    if (currentColor !== '' && currentSize !== '' && quantity > 0) {
      return true
    }
    else {
      return false
    }
  }

  //function add to cart
  const addToCart = () => {

    if (CheckField()) {
      //if checkField return true need add item in the cart
      let NameOfItem = thisProduct['Title']
      let PriceOfItem = thisProduct['Price'] * quantity
      let ItemDes = thisProduct['Description']
      let ItemImage = thisProduct['Item_Image']
      let item = [{ NameOfItem, PriceOfItem, id, currentColor, currentSize, ItemDes, ItemImage, quantity }]

      if (localStorage.getItem('cart')) {
        let itemFromLocalStorage = JSON.parse(localStorage.getItem('cart'))
        for (let i = 0; i < itemFromLocalStorage.length; i++) {

          if (itemFromLocalStorage[i].id === id && itemFromLocalStorage[i].currentColor === currentColor && itemFromLocalStorage[i].currentSize === currentSize) {
            itemFromLocalStorage[i].quantity += quantity
            itemFromLocalStorage[i].PriceOfItem = thisProduct['Price'] * itemFromLocalStorage[i].quantity
            localStorage.setItem('cart', JSON.stringify(itemFromLocalStorage))
            history.push(window.location.pathname)
            return
          }

        }
        itemFromLocalStorage.push(null)
        itemFromLocalStorage[itemFromLocalStorage.length - 1] = item[0]
        localStorage.setItem('cart', JSON.stringify(itemFromLocalStorage))
        history.push(window.location.pathname)
        OpenCart()
      }

      else {

        localStorage.setItem('cart', JSON.stringify(item))
        history.push(window.location.pathname)
        OpenCart()

      }
    }
    else {
      alert("יש לבחור צבע , כמות ,ומידה")
    }
  }
  //add to wishlist func
  const addToWishList = () => {
    let NameOfItem = thisProduct['Title']
    let PriceOfItem = thisProduct['Price']
    let ItemDes = thisProduct['Description']
    let ItemImage = thisProduct['Item_Image']
    let item = [{ NameOfItem, PriceOfItem, id, ItemDes, ItemImage, quantity }]

    if (localStorage.getItem('wishlist')) {

      let itemFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))
      let ok = true 

      for (let i = 0; i < itemFromLocalStorage.length; i++) {
        if (itemFromLocalStorage[i].id === id ) {
          itemFromLocalStorage =  itemFromLocalStorage.filter(i => i.id !== id)
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


  // if items is null show loader animation
  if (items === null) {

    return (
      <div className="centerPP">
        <div class="loader"></div>
        <h1 className="logoMaleBox2">male box</h1>
      </div>
    )
  }
  // else return product page

  else {

    // vars color , size , for current item
    let thisProductColor = [];
    let thisProductSize = [];

    // if dont found item return page not found
    if (thisProduct === undefined) {
      return <center><h1>Page Not Found</h1></center>
    }

    // split list of colors and size 
    //create array of size and color
    else {
      if (thisProduct.Color != null)
        thisProductColor = thisProduct.Color.split(',')
      if (thisProduct.size != null)
        thisProductSize = thisProduct.size.split(',')
    }

    // array images for gallery images in pruduct page
    const images = () => {
      if (items !== null) {
        let CurrentItemImage = items
        const images = [
          {
            original: CurrentItemImage.Item_Image,
            thumbnail: CurrentItemImage.Item_Image
          },
          {
            original: CurrentItemImage.Item_Image,
            thumbnail: CurrentItemImage.Item_Image,
          },
          {
            original: CurrentItemImage.Item_Image,
            thumbnail: CurrentItemImage.Item_Image,
          },
        ];
        return images
      }


    }


    return (
      <div>
        <NavBar></NavBar>
        <MyCart open={CartModal} func={OpenCart}></MyCart>
        <div className="header-prodoct-page">
          <Container>
            <Row>
              <Col md='6'>
                <div className="image-product">
                  <ImageGallery items={images()} additionalClass="galleryProduct" />
                </div>
              </Col>
              <Col md='6'>
                <div className="about-product">
                  <div className="header-about-product">
                    <h3>{thisProduct.Title}</h3>
                    <h5>{thisProduct.Price + "  ₪"}</h5>
                  </div>
                  <hr />
                  <div className="body-about-product">
                    <p>{thisProduct.Description}</p>
                    <p className="title-choose">:בחר צבע</p>
                    <div className="about-product-sec">
                      <div className="colors">
                        {thisProductColor.map((c, i) => {
                          return <button key={i} ref={el => ButtonsColor.current[i] = el} id={c} className="colorButton" value={c} onClick={e => { changeColor(e.target); }}></button>
                        })}
                      </div>
                    </div>
                    <p className="title-choose">:בחר מידה</p>
                    <div className="about-product-sec">
                      <div className="sizes">
                        {thisProductSize.map((s, i) => {
                          return <button key={i} ref={el => ButtonsSize.current[i] = el} className="size" value={s} onClick={e => { changeSize(e.target); }}>{s}</button>
                        })}
                      </div>
                    </div>
                    <p className="title-choose">:בחר כמות</p>
                    <div className="about-product-sec">
                      <div className="counter-product-page">
                        <div onClick={e => { setQuantity(Number(quantity) + 1); }}>
                          {Pluse}
                        </div>
                        <div >
                          <input className="input-counter" value={quantity} onChange={e => { setQuantity(e.target.value) }} />
                        </div>
                        <div onClick={e => { setQuantity(Number(quantity) - 1); }}>
                          {Minus}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="footer-about-product">
                    <Button className="btn-male-box" onClick={addToCart}>הוספה לסל</Button>
                    <Button className="btn-male-box" onClick={addToWishList}>WishList &nbsp;&nbsp;&nbsp;{Heart}</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer></Footer>
      </div>
    )
  }
}
export default ProductPage;