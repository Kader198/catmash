export default function ImageSide({image,handleVersus}){
    return (
        <div
             className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2'>
            <div className={"heart-image-container items-center justify-items-center"}>

                <img src={image?.url}
                     className={'heart-image ml-40 w-full h-full object-cover'}
                     alt={"ll"}/>

            </div>
            <div className="flex-1 flex items-end mt-6">
                <button
                    onClick={() => handleVersus()}
                    className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'>
                    Vote
                </button>
            </div>
        </div>

    )
}
