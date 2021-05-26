function Preview(game){
    console.log(game);
    return (
        <div className="card">
            <img src={game.game.image_url} />
            <p>{game.game.description}</p>
        </div>
    )
}

export default Preview;