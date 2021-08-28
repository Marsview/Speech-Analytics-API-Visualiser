import React,{Component} from 'react';

import Transcript from './models/transcript/transcript';
import Topics from './models/topicsData/topics';
import Actions from './models/actions/actions';
import MeetingActivity from './models/meetingActivity/meeting';
import Summary from './models/summaryData/summary';
import QuestionResponse from './models/questionResponse/questions';
import Screengrabs from './models/screengrabs/screengrabs';
import DataInsights from './models/dataInsights/dataInsights';

import './index.css';
import './visualizer.css';

const initialState = {
  selectedFile: null,
  fileData: null,
  modals: [],
  leftContainer: true,
  middleContainer: true,
  rightContainer: true,
  alert:false,
  alertMsg:'',
  txnId: '',
  loading: false
}

let currentModals = [];
 
class DataVisualize extends Component {
  constructor(props) {
    super(props);

      this.state = initialState;

    this.fileUploadButton = React.createRef();

    this.selectFile = this.selectFile.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.writeData = this.writeData.bind(this);
    this.getCurrentModals = this.getCurrentModals.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.getTranscript = this.getTranscript.bind(this);

    this.clearFiles = this.clearFiles.bind(this);
  }
    
  clearFiles(e) {
    e.preventDefault();
    this.setState(initialState);
  }
  
  // On file select (from the pop up)
  onFileChange = event => {
    this.handleDrop(event.target.files)
  };

  selectFile() {
    this.fileUploadButton.current.click();
  }

  getCurrentModals(data) {
    currentModals = data.filter(modal => modal.modalData);
    return currentModals;
  }

  getTranscript(data) {
    let transcript = [];
    if(data.sentiment) {
      data.sentiment.forEach((items) => {
        const transcription = this.getTranscriptInfo(items, transcript);
        transcription && transcript.push(transcription);
      })
    }
    if(data.emotion) {
      data.emotion.forEach((items) => {
        const transcription = this.getTranscriptInfo(items, transcript);
        transcription && transcript.push(transcription);
      })
    }
    if(data.speechType) {
      data.speechType.forEach((items) => {
        const transcription = this.getTranscriptInfo(items, transcript);
        transcription && transcript.push(transcription);
      })
    }
    transcript.sort((a,b) => (a.startTime > b.startTime) ? 1 : ((b.startTime > a.startTime) ? -1 : 0))
    return transcript;
  }

  getTranscriptInfo(items, transcript) {
    const sentence = items.sentence;
    const startTime = items.startTime;
    const speakers = [items.speakers];
    const index = transcript.findIndex(time => time.startTime === startTime);
    if(index<0) {
      return {
        sentence: sentence,
        startTime: startTime,
        speakers: speakers
      }
    }

  }

  writeData = (data) => {
    if(!data.transcript) {
      const temp = this.getTranscript(data);
      // console.log(temp)
      if(temp.length > 0) {
        let fileState = this.state.fileData;
        fileState.transcript = temp;
        this.setState({
          fileData: fileState
        })
      } else {
        this.setState({
          middleContainer: false
        })
      }
    }
    if(!(data.actionsData || data.meetingActivity || data.questionResponse || data.screengrabs)) {
      this.setState({
        leftContainer: false
      })
    }
    if(!(data.topicsData || data.summaryData || data.dataInsights)) {
      this.setState({
        rightContainer: false
      })
    }
  }

  toggleVisibility(e, idx) {
    e.preventDefault();
    // console.log(currentModals[idx])
    if(currentModals[idx]=== 'visible'){
      currentModals[idx].filter = 'invisible';
    }
  }

  handleDrop = (file) => {
    this.setState({ selectedFile: file[0] }, () => {
      const formData = new FormData();
      if(this.state.selectedFile) {
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
      }
  
      var reader = new FileReader();
      reader.onload = (() => {
        return function (e) {
          try {
            const json = JSON.parse(e.target.result);
            this.setState({ 
              fileData: json.data,
            });
            this.writeData(this.state.fileData);
            // console.log('read');
          } catch (ex) {
            // console.log(this.state.alert)
            this.setState({
              alert: true,
              alertMsg: 'Please import a valid Marsview API generated JSON output.'
            })
            setTimeout(
              function() {
                  this.setState({ alert: false });
              }
              .bind(this),
              2000
            );
            this.clearFiles(e);
          }
        }.bind(this);
      })(file[0]);
      reader.readAsText(file[0]);
    });
  }
    
    render() {
      return (
        <div className="mv-visualizer-container container-fluid">
            {this.state.fileData && (
              <React.Fragment>
                <div className="file-data-container mb-3">
                  <div className="rounded-0">
                    <div className="d-flex align-items-center justify-content-end">
                      <p className="mr-3 mb-0">{this.state.selectedFile.name}</p>
                      <button className="btn btn-warning" onClick={this.clearFiles}>Clear</button>
                    </div>
                  </div>
                </div>
                <div className="mv-visualize" style={{zIndex:-1}}>
                <React.Fragment>
                  <div className="row d-flex justify-content-center">
                    {this.state.leftContainer && (
                    <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                    <div className="left-container">
                      <Actions fileData={this.state.fileData}/>
                      <MeetingActivity fileData={this.state.fileData}/>
                      <QuestionResponse fileData={this.state.fileData} />
                      <Screengrabs fileData={this.state.fileData}/>
                    </div>
                  </div>
                    )}
                    {this.state.middleContainer && (
                      <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                        <div className="middle-container">
                          <Transcript fileData={this.state.fileData}/>
                        </div>
                      </div>
                    )}
                    {this.state.rightContainer && (
                      <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12">
                        <DataInsights fileData={this.state.fileData}/>
                        <Topics fileData={this.state.fileData}/>
                        <Summary fileData={this.state.fileData}/>
                    </div>
                    )}
                  </div>
                </React.Fragment>
              </div>
            </React.Fragment>
            )}
            {!this.state.fileData &&
            <div className="mv-visualizer-content d-flex justify-content-center align-items-center flex-column">
                  <div className="card">
                    <div className="card-header text-center">
                      <h1>Visualize JSON Output</h1>
                    </div>
                    <div className="card-body align-items-center text-center d-flex flex-column">
                      <div className="mb-3 mt-3">
                          <input 
                          ref={this.fileUploadButton} 
                          style={{display: "none"}} 
                          accept="application/json" 
                          type="file" onChange={this.onFileChange} />
                          <button className="btn btn-primary" onClick={this.selectFile}>Import JSON Output</button>
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <p>Marsview API generated JSON outputs only. 
                        <a href="https://docs.marsview.ai" target="_blank" rel="noreferrer">Learn More.</a>
                      </p>
                    </div>
                  </div>
                {this.state.alert && (
                <div style={{position:"absolute", top:"10%"}} className="alert alert-dark text-center w-auto">
                  {this.state.alertMsg}
                </div>
                )}
            </div>
          }
        </div>
      );
    }
  }
 
  export default DataVisualize;