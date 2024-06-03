import React from 'react';
import img1 from '../assets/image1.jpg';
import img2 from '../assets/image2.jpg';
import img3 from '../assets/image3.jpg';

const EventsComponent = ({ selectedItem }) => {

    return (
        <>
            <h4 className='text-secondary fw-normal'>{selectedItem?.title}</h4>
            <h3 className='badge bg-dark mb-4'>{selectedItem?.type}</h3>

            <div id="demo" className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} alt="Los Angeles" className="d-block" style={{ width: '100%' }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} alt="Chicago" className="d-block" style={{ width: '100%' }} />
                    </div>
                    <div className="carousel-item">
                        <img src={img3} alt="New York" className="d-block" style={{ width: '100%' }} />
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
            {/* <div className="my-3">
                We are thrilled to announce the launch of our latest product line designed to revolutionize the way you work and interact with technology. After months of dedicated research, development, and testing, we are proud to introduce [Product Name], the newest addition to our innovative portfolio.
            </div> */}
        </>
    )
}

export default EventsComponent;