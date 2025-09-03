
export function conBackground(con, itsLike, callBack1, callBack2) {
    if (con.includes('Sunny') || con.includes('Sun') || con.includes('Clear')) {
        itsLike.style.backgroundImage = "url('../img/sky.jpg')";
    } else if (con.includes('Mist') || con.includes('Fog')) {
        itsLike.style.backgroundImage = "url('../img/mist.jpg')";
        callBack1();
    } else if (con.includes('Rain') || con.includes('ain') || con.includes('rizzle') && !con.includes('hunder')) {
        itsLike.style.backgroundImage = "url('../img/newrain.jpg')";
        itsLike.style.fontWeight = "200px";

    } else if (con.includes('Snow') || con.includes('snow')) {
        itsLike.style.backgroundImage = "url('../img/snowy.jpg')";
    } else if (con.includes('Thunder') && con.includes('ain') || con.includes('thunder') && con.includes('rain')) {
        itsLike.style.backgroundImage = "url('../img/thunder.jpg')";
        itsLike.classList.add('overcast');
        callBack2();

    } else if (con.includes('Overcast') || con.includes('cast')) {
        itsLike.style.backgroundImage = "url('../img/isCast.jpg')";
        callBack1();

    } else if (con.includes('Cloud') || con.includes('cloud')) {
        itsLike.style.backgroundImage = "url('../img/cloud.jpg')";
    }

}


export function getTime(time) {
    const hr = time.split('');
    hr.splice(0, 11);
    const bn = hr.join('');
    const re = bn.split(':')
    if (re[0] > 12) {
        let hour = re[0] - 12;
        return `${hour}:${re[1]} pm`
    } else if (re[0] == 12) {
        return `12:${re[1]} pm`
    } else if (re[0] === '0') {
        return `12:${re[1]} am`
    } else {
        return `${re[0]}:${re[1]} am`
    }
}


export function getDate(day) {
    const date = day.split('');
    date.splice(10, 7);
    const newDay = date.join('');
    const rev = newDay.split('-');
    rev.reverse();
    const str = rev.join('-');
    const rep = str.replace(/[-]/g, '/');
    const ones = rep.split('');
    if (ones[0] === '0' && ones[3] === '0') {
        ones.splice(0, 1);
        ones.splice(2, 1);
        const theDate = ones.join('');
        return theDate;
    } else if (ones[0] === '0' && ones[3] > '0') {
        ones.splice(0, 1);
        const theDate = ones.join('');
        return theDate;
    } else if (ones[0] > '0' && ones[3] === '0') {
        ones.splice(3, 1);
        const theDate = ones.join('');
        return theDate;
    }
    else {
        const theDate = ones.join('');
        return theDate;
    }
};


export function removeDecimal(temp) {
    const newTemp = Math.floor(temp);
    return newTemp;
}







