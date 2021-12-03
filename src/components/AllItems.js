import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import React, { useState, useEffect } from 'react';


const AllItems = (props) => {

    const [items, setItems] = useState(null);
    // const [profileImage, setProfileImaget] = useState('');

    
    // const uploadImage = (input) => { // העלאת תמונה והמרה לבייס 64


    //     if (input.files && input.files[0]) {
    //         let reader = new FileReader();

    //         reader.onload = function (e) {
    //             setProfileImaget(e.target.result);
    //             console.log(e.target.result)
    //         }

    //         reader.readAsDataURL(input.files[0]); //convert to base64 string
    //     }
    // }


    const LoadItems = async () => {
        try {
            let res = await fetch('/api/items', { method: 'GET' })
            let data = await res.json()
            return data
            // setItems(data)
        }
        catch (err) { console.log(err) }
    }

    useEffect(() => {

        LoadItems().then(data => {
            setItems(data)
        })

    }, [])

    let itemFromLocalStorage = JSON.parse(localStorage.getItem('wishlist'))


    if (items !== null && items !== undefined) {
        return (
            <>
                <div className="all-items">
                    <center>
                        <Container>
                            <Row>
                                {items.filter(i => i.Category_Name === props.Category_Id || props.Category_Id === "הכל" || props.Category_Id === "").map(item => {
                                    let iteminwishlist = []
                                    if(itemFromLocalStorage)
                                    {
                                        iteminwishlist = itemFromLocalStorage.filter(i => item.Item_Id.toString() === i.id.toString())
                                        
                                    }
                                    if(iteminwishlist.length > 0)
                                    {
                                        return <>
                                        <Col lg="3" md="4" sm="6">
                                            <Product key={item.Item_Id} name={item.Title} image={item.Item_Image} price={item.Price} id={item.Item_Id} inWishList={true} > </Product>
                                        </Col>

                                    </>
                                    }
                                    else
                                    {
                                        return <>
                                        <Col lg="3" md="4" sm="6">
                                            <Product key={item.Item_Id} name={item.Title} image={item.Item_Image} price={item.Price} id={item.Item_Id}> </Product>
                                        </Col>

                                    </>
                                    }
                                })}
                            </Row>
                            {/* <form>
                                <input type="file" onInput={(event) => { uploadImage(event.target) }} />
                            </form>
 */}
                        </Container>
                    </center>
                </div>
            </>
        )
    }
    else {
        return (
            <center>
            <div class="loader"></div>
             <h1 className="logoMaleBox2">male box</h1>
          </center> 
        )

    }
}


export default AllItems;