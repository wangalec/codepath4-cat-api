

const CatCard = (props) => {
    return(
        <div className="CatCard">
            <div>
                <h2>{props.breed}</h2>
                <h2>{props.origin} </h2>
                <h2>{props.description}</h2>
            </div>
            <img src={props.url}/>
        </div>
    )
}

export default CatCard;