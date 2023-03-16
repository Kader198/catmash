export default function ImageSide({image, handleVersus, score = false}) {
    return (
        <div
            className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
            <div className={"heart-image-container items-center justify-items-center"}>

                <img src={image?.url}
                     className={'heart-image ml-40 w-full h-full object-cover'}
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
                    (<div className="flex-1 flex items-end mt-6">
                            <button
                                onClick={() => handleVersus()}
                                className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                                Vote
                            </button>
                        </div>
                    )
            }
        </div>

    )
}
