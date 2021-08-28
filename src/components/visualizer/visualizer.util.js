class ModalServices {
    secsToTime(value) {
        value = value/1000;

        const hours = (Math.round(value/3600)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
        const mins = (Math.round((value%3600)/60)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });
        const secs = (Math.round((value%3600)%60)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
          });

        return (hours+":"+mins+":"+secs);
    }
}

export default new ModalServices();