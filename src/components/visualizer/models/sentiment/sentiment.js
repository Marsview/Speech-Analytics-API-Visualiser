const Sentiment = (props) => {
    if(!props.fileData.sentiment) {
        return(<></>);
    }

    const sentimentData = props.fileData.sentiment.find(id => id.startTime === props.id);

    if(sentimentData) {
        return(
            <h5 className="mr-4 d-inline">
                <span>
                    Sentiment: <div className="badge badge-success">
                        {sentimentData.sentiment}    
                    </div> 
                </span>
            </h5>
        )
    } else {
        return(<></>);
    }
}

export default Sentiment;