import React, {useState} from 'react';
import {connect} from 'react-redux';
import { createProduct } from '../../services/storeServices';

const CreateStoreitemPage = ({token}) => {

    const [name, setName] = useState('');
    const [stock, setStock] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [maxOrder, setMaxOrder] = useState(undefined);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(undefined);

    const handleClick = () => {
        const formData = new FormData();
        formData.append('file', image[0]);
        formData.append('productName', name);
        formData.append('stock', stock);
        formData.append('price', price);
        formData.append('maxOrder', maxOrder);
        formData.append('description', description);

    
        createProduct(token, formData);
        setName('');
        setStock('');
        setPrice('');
        setMaxOrder('');
        setDescription('');
        setImage(undefined);
        
    }

    return(
        <div className="layout-flat__body create-item">
            <div className="heading-2">Add Store Item</div>
            <input value={name} placeholder="product name (required)" onChange={(e)=>setName(e.target.value)} className="create-item--field heading-3" />
            <input value={price} placeholder="price in points (required)" onChange={(e)=>setPrice(e.target.value)} className="create-item--field heading-3" />
            <input value={maxOrder} placeholder="how many can one person order" onChange={(e)=>setMaxOrder(e.target.value)} className="create-item--field heading-3" />
            <input value={stock} placeholder="how many are in stock" onChange={(e)=>setStock(e.target.value)} className="create-item--field heading-3" />
            <input value={description} placeholder="description..." onChange={(e)=>setDescription(e.target.value)} className="create-item--field heading-3" />
            <input type='file' onChange={(e)=> setImage(e.target.files)} className="create-item--image"/>
            <div onClick={handleClick} className="create-item--button heading-3">Add Item</div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    token: state.user.token,
});

export default connect(mapStateToProps)(CreateStoreitemPage);

