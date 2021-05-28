import {useSelector} from 'react-redux';

function Details(){
    const details = useSelector(store => store.details);
    console.log(details);

    return (
        <div>
            {details[0] === undefined ?
            '' : (
                <section>
                        <p>{details[0].game_title}</p>
                        <img src={details[0].image_url}></img>
                        <p>{details[0].developer}</p>
                        <p>{details[0].publisher}</p>
                        <p>{details[0].genre_name}</p>
                        <p>{details[0].description}</p>
                        <p>{details[0].play_time}</p>
                </section>
            )}
        </div>
    )

}

export default Details;