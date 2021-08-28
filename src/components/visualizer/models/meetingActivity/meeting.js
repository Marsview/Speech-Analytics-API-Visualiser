import MeetingPieChart from '../../../charts/pieChart';

let meetingData = [];

const calculateTimeData = (data) => {
    // eslint-disable-next-line array-callback-return
    data.forEach(item => {
        const name = item.meetingActivity[0].displayName || item.meetingActivity[0].className;
        const time = item.endTime - item.startTime;
        const index = meetingData.findIndex(item => item.name === name);
        if(index > -1) {
            meetingData[index].value += time;
        } else {
            meetingData.push({name: name, value: time});
        }
    });
}

const MeetingActivity = (value) => {
    if(!value.fileData.meetingActivity) {
        return(<></>);
    }
    calculateTimeData(value.fileData.meetingActivity);
    return(
        <div className="card">
            <div className="card-header">
                <h4>Meeting Activity</h4>
            </div>
            <div className="card-body"> 
                <MeetingPieChart data={meetingData}/>
            </div>
        </div>
    )
}

export default MeetingActivity;