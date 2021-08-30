const timer = (sec: number) => new Promise(res => setTimeout(res, sec));

export default timer;
