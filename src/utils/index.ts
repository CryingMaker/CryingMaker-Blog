export const getTime = (e: Date = new Date): string => {
    let date = new Date(e);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let dayS: string = '';
    let monthS: string = '';

    if (day < 10) {
        dayS = '0' + day;
    }
    if (month < 10) {
        monthS = '0' + month;
    }

    return `${year}/${monthS}/${dayS} ${hours}:${minutes}:${seconds}`
}

// export const getObjectURL = (file: File) => {
//     let url = null;
//     if (window.createObjectURL != undefined) {
//         url = window.createObjectURL(file);
//     } else if (window.URL != undefined) {
//         url = window.URL.createObjectURL(file);
//     } else if (window.webkitURL != undefined) {
//         url = window.webkitURL.createObjectURL(file);
//     }
//     return url;
// }