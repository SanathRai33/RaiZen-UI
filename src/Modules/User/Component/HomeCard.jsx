import React from 'react'
import '../CSS/Home.css';

export default function HomeCard(props) {

    return (
        <div className='HomeCard flex items-center justify-center flex-column gap-4 p-4 bg-white m-0' style={{width: '500px'}}>

            <h5 className="card-heading text-lg font-bold bg-danger">{props.heading}</h5>
            <div className='cards flex items-center justify-center flex-wrap gap-3'>
                <div className="card-body">
                    <img src={props.img1} style={{ backgroundColor: 'red' }} alt="Product" />
                    <p className="card-text text-gray-700 text-center">Product description</p>
                </div>
                <div className="card-body">
                    <img src={props.img2} style={{ backgroundColor: 'red' }} alt="Product"  />
                    <p className="card-text text-gray-700 text-center">Product description</p>
                </div>
                <div className="card-body">
                    <img src={props.img3} style={{ backgroundColor: 'red' }} alt="Product"  />
                    <p className="card-text text-gray-700 text-center">Product description</p>
                </div>
                <div className="card-body">
                    <img src={props.img4} style={{ backgroundColor: 'red' }} alt="Product"  />
                    <p className="card-text text-gray-700 text-center">Product description</p>
                </div>
            </div>
        </div>
    )
}
