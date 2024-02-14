// Instructs the browser to save data as a file.
// https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
import {format} from "date-fns";

function download(data: string, type_of = "text/plain", filename = "data.txt") {
    const body = document.body;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], {
        type: type_of
    }));
    a.setAttribute("download", filename);
    body.appendChild(a);
    a.click();
    body.removeChild(a);
}

// Instructs the browser to load data from the specified file.
async function upload(file: Blob): Promise<string> {
    return new Promise<string>(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(response) {
            resolve(<string>response.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsText(file);
    });
}

// Creates a safe filename base for the timestamp given. No extension.
function getTimeStampFileName(date: Date) {
    return format(date, "yyyy-MM-dd-HHmmss");
}

const fileTools = {
    download: download,
    upload: upload,
    getTimeStampFileName: getTimeStampFileName
};

export default fileTools;