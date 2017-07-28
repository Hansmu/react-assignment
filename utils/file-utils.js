
function readAsText(fileToRead, callback) {
    const reader = new FileReader();
    reader.readAsText(fileToRead);

    reader.onload = (event) => {
        if (callback) {
            callback(event.target.result);
        }
    };
}

function readAsDataUrl(blob, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onloadend = (event) => {
        if (callback) {
            callback(event.target.result);
        }
    }
}

export default { readAsText, readAsDataUrl };