const Intent = (value) => {
    const data = value.fileData.suggestedIntents;
    if(!data || data.length<1) {
        return(<></>);
    }
    return(
        <div className="card">
            <div className="card-header">
                <h4>Suggested Intents</h4>
            </div>
            <div className="card-body">
                <ul className="list-unstyled d-flex flex-wrap">
                    {data.map((intent, idx) => {
                        return(
                            <li className="mt-1 mr-1" key={idx}>
                                <div className="badge badge-success">{intent}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Intent;