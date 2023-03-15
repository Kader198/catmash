import {Link, Head} from '@inertiajs/react';
import {useEffect, useState} from "react";
import './Styles/heart-image.css';
import axios from "axios";
import ImageSide from "@/Components/ImageSide";

export default function ImagesVersus(props) {


    // ! 1. create state for cats images
    const [images, setImages] = useState([]);
    const [updateShowedImagesCount, setUpdateShowedImagesCount] = useState(0);
    const [showedImagesCount, setShowedImagesCount] = useState(0);
    // ! images (left & right)
    const [leftImage, setLeftImage] = useState(null)
    const [rightImage, setRightImage] = useState(null)

    const constants = {
        left: 'image_left',
        right: 'image_right'
    }
    // ! 2. fetch data from api
    useEffect(() => {
        setImages(props.images)
        setLeftImage(props.images[0])
        setRightImage(props.images[1])
    }, []);


    // ! 3. update cat
    useEffect(() => {
        if (updateShowedImagesCount) {
            setImages(images.slice(updateShowedImagesCount, updateShowedImagesCount + 2));
            setLeftImage(images.slice(updateShowedImagesCount, updateShowedImagesCount + 2)[0])
            setRightImage(images.slice(updateShowedImagesCount, updateShowedImagesCount + 2)[1])
        }
    }, [updateShowedImagesCount]);

    const versus = (winner, image_left, image_right) => {
        axios.post('api/images/versus', {
            winner: winner,
            image_left: image_left,
            image_right: image_right
        }).then((response) => {
            setUpdateShowedImagesCount(updateShowedImagesCount + 2);
        }).catch((error) => {
            console.log(error);
        });
    }

    // ! 3. return jsx
    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Catsmash
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        {/* Image cat*/}
                        <p>
                            {/*    description for facemash cats */}
                            description for facemash cats
                        </p>
                    </div>
                </div>
                <div
                    className='mt-10 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2'>

                    {/*! left image */}
                    <ImageSide key={1} image={leftImage} handleVersus={() => {
                        versus(
                            constants.left,
                            leftImage.id,
                            rightImage.id
                        )
                    }
                    }/>



                    {/*! right image */}
                    <ImageSide key={2} image={rightImage} handleVersus={() => {
                        versus(
                            constants.right,
                            leftImage.id,
                            rightImage.id
                        )
                    }
                    }/>

                </div>

            </div>


        </section>
    );
}
