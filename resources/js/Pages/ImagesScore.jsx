import ImageSide from "@/Components/ImageSide";
import CatImage from "@/Assets/images/catmash1.jpg";
export default function ImagesScore(props) {
    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                {/*<div className={'text-center place-content-center'}>*/}
                {/*    <img src={CatImage} alt={"a"}/>*/}
                {/*</div>*/}
                <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                        Catsmash
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        {/* Image cat*/}
                        <p>
                            {/*    description for facemash cats */}
                            Listes du classement des chats les plus mignons
                        </p>
                    </div>
                </div>
                <div
                    className='mt-10 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-2'>
                {
                        props.images.map((image, index) => (
                            <ImageSide key={index} image={image} score={true}/>
                        ))
                    }

                </div>

            </div>


        </section>
    )
}
