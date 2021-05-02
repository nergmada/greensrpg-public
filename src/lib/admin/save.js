import { saveAs } from 'file-saver';
export default (data) => {
    const strified = JSON.stringify(data);
    const save_file = new Blob([strified], { 
        type: "application/json;charset=utf-8" 
    });
    return saveAs((new File([save_file], `${data.instance_id}.json`)), `${data.instance_id}.json`);
}