import { Product } from "./Product";
import { Artist } from "./Artist";
import { Event } from "./Event";
import React, { useEffect, useRef } from "react";
import Flickity from "flickity";

import "flickity/dist/flickity.min.css";
import "../styles/dots.css";
import "flickity-imagesloaded";

export const Carousel = ({ products, artists, events }) => {
    const flickityOptions = {
        cellAlign: "center",
        wrapAround: true,
        draggable: window.innerWidth < 768 ? true : false,
        prevNextButtons: window.innerWidth < 768 ? false : true,
        pageDots: true,
        imagesLoaded: true,
    };

    const carouselRef = useRef(null);
    const flickityInstance = useRef(null);

    useEffect(() => {
        // Initialize Flickity carousel after the content is fully loaded
        flickityInstance.current = new Flickity(
            carouselRef.current,
            flickityOptions
        );
    }, []);

    return (
        <div ref={carouselRef} className="carousel mb-12">
            {products &&
                products.map((product) => {
                    return (
                        <Product
                            key={product._id}
                            product={product}
                            type="carousel"
                        />
                    );
                })}
            {artists &&
                artists.map((artist) => {
                    return (
                        <Artist
                            key={artist._id}
                            artist={artist}
                            type="carousel"
                        />
                    );
                })}
            {events &&
                events.map((event) => {
                    return (
                        <Event key={event._id} events={event} type="carousel" />
                    );
                })}
        </div>
    );
};
