
export default class DateString {
    static getDate() {
        const now = new Date;
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        if(month<10) { month = "0" + month; }
        let day = now.getDate();
        if(day<10) { day = "0" + day; }
        let hour = now.getHours();
        if(hour<10) { hour = "0" + hour; }
        let minute = now.getMinutes();
        if(minute<10) { minute = "0" + minute; }
        let second = now.getSeconds();
        if(second<10) { second = "0" + second; }
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
} 