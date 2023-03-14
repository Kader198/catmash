import { Link, Head } from '@inertiajs/react';
import {useEffect, useState} from "react";
import './Styles/heart-image.css';
import axios from "axios";
export default function Welcome(props) {

        // ! 1. create state for cats images
        const [catsImages, setCatsImages] = useState([]);
        const [updateShowedImagesCount, setUpdateShowedImagesCount] = useState(0);
        // ! 2. fetch data from api
        useEffect(() => {
            fetch('https://latelier.co/data/cats.json')
                .then(response => response.json())
                .then(data => setCatsImages(data.images.slice(0, 2)))
                .catch(error => console.log(error));
        }, []);

        // ! 3. update cat
        useEffect(() => {
            if (updateShowedImagesCount) {
                axios.get('https://latelier.co/data/cats.json')
                    .then((response) => {
                        setCatsImages(response.data.images.slice(updateShowedImagesCount, updateShowedImagesCount+2));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }, [updateShowedImagesCount]);

    const voteForCat = (id) =>{
        axios.post('/api/voteForCat', {
            id: id
        }).then((response) => {
            console.log(response);
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
                    <div className='mt-10 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2'>
                        {
                            catsImages.map((item, idx) => (
                                    <div key={idx} className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
                                    <div className={"heart-image-container items-center justify-items-center"}>

                                            <img src={item.url}
                                            className={'heart-image ml-40 w-full h-full object-cover'}
                                                 alt={"ll"}/>

                                    </div>
                                    <div className="flex-1 flex items-end mt-6">
                                        <button
                                            onClick={() => voteForCat(item.id)}
                                            className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                                            Vote
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        );
}
