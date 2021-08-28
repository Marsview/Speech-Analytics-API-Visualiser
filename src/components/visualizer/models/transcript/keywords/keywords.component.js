const Keywords = (props) => {
    if(!props.keywords || props.keywords.length === 0) {
        return(<></>)
    }

    let allKeywords = [];

    props.keywords.forEach((keyw, idx) => {
        return(
            <>
                {allKeywords.push(keyw.keyword)}
            </>
        )
    })

    return(
        <div className="keywords-container">
        <h5 className="d-inline">Keywords: </h5>
        <p className="d-inline">
            {allKeywords.join(', ')}.
        </p>
    </div>
    )
}

export default Keywords;