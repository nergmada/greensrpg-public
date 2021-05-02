export const getTime = (dt) => {
    const hour = dt.getUTCHours();
    const mins = `${dt.getUTCMinutes()}`;
    if (mins.length < 2) return `${hour}:0${mins}`;
    else return `${hour}:${mins}`;
}

export const getDate = (dt) => {
    const day = dt.getDate();
    const month = dt.getMonth() + 1;
    return `${day}/${month}`;
}