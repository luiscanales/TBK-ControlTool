export class User {

    constructor(_id = '', name = '', username = '', position = '', email = '') {
        this._id = _id;
        this.name = name;
        this.username = username;
        this.position = position;
        this.email = email
    }

    _id: string;
    name: string;
    username: string;
    position: string;
    email: string
}