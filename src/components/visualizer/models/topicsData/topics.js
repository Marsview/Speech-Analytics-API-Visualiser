const Topics = (props) => {
    if(!props.fileData.topicsData) {
        return(<></>);
    }
    return(
        <div className="mv-topics-container">
            <div className="card">
                <div className="card-header">
                    <h4>Topic Detection</h4>
                </div>
                <div className="card-body">
                    <ul className="list-unstyled d-flex flex-wrap">
                        {props.fileData.topicsData.map((topics, idx) => {
                            return(
                                <li className="mt-1 mr-1" key={idx}>
                                    <div className="badge badge-primary">{topics}</div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Topics;