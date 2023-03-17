import {useState} from "react";

export default function ImageSide({image, handleVersus, score = false}) {
    const [loading, setLoading] = useState(false);
    const defaultClass = 'px-3 py-3 rounded-lg w-full  font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700';
    const focusClass = 'px-3 py-3 disabled rounded-lg w-full focus:bg-indigo-300 font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700';
    return (
        <div
            className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
            <div className={"heart-image-container mx-auto flex items-center justify-center"}>
                    <img src={image?.url}
                         className={'heart-image  w-full h-full object-cover'}
                         alt={"ll"}/>
            </div>
            {
                score ? (
                        <div className="flex-1 flex items-end mt-6">
                            <div
                                className='px-3 py-3 text-center rounded-lg w-full font-semibold text-xl duration-150 text-indigo-900 bg-indigo-100 '>
                                <b>
                                    Score:
                                </b> {image?.score}
                            </div>
                        </div>
                    ) :
                    (<div className="flex-1 mx-auto text-center flex items-end mt-6">
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    handleVersus();
                                    setTimeout(() => {
                                        setLoading(false);
                                    }, 300);
                                }
                                }
                                className={!loading ? defaultClass : focusClass}>
                                {
                                    loading ? (
                                        <svg className="animate-spin text-white h-5 w-5 " xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                                            <path fill="#FFFFFF" d="M15 50a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm40 0a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm30 0a5 5 0 0 1 10 0 5 5 0 0 1-10 0z">
                                                <animate attributeName="d" dur="1s" repeatCount="indefinite" keyTimes="0;0.5;1" values="M15 50a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm40 50a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm30-50a5 5 0 0 1 10 0 5 5 0 0 1-10 0z;M15 30a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm40 50a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm30-50a5 5 0 0 1 10 0 5 5 0 0 1-10 0z;M15 50a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm40 0a5 5 0 0 1 10 0 5 5 0 0 1-10 0zm30 0a5 5 0 0 1 10 0 5 5 0 0 1-10 0z" />
                                            </path>
                                        </svg>
                                    ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6 " radius={10}>
                                    <path d="M12,21.35L3.29,12.65C1.54,10.9 1.54,7.59 3.29,5.84C5.04,4.09 8.35,4.09 10.1,5.84L12,7.74L13.9,5.84C15.65,4.09 18.96,4.09 20.71,5.84C22.46,7.59 22.46,10.9 20.71,12.65L12,21.35Z"/>

                                </svg>
                                    )}
                            </button>
                        </div>
                    )
            }
        </div>

    )
}
