export default class UserInfo {
    constructor({ userName, userJob }) {
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(userJob);
    }

    getUserInfo() {
        const dataUser = {
            name: this._userName.textContent,
            job: this._userJob.textContent
        };
    
        return dataUser;
    }

    setUserInfo({ name, job }) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}