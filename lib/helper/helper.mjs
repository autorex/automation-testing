let report;
let userData = {
    id: '',
    name: '',
    email: '',
    gender: '',
    status: ''
  };

export function setReport(newReport){
    return report = newReport;
}

export function getReport(){
    return report;
}

export function setUserData(newUserData){
    return userData = newUserData;
}

export function getUserData(){
    return userData;
}