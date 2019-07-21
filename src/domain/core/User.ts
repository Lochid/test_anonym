export default class User {
    public id: number;
    public login: string;
    public passwordHash: string;

    constructor(userData: { [key: string]: any; });
    constructor(id: number, login: string, passwordHash: string);

    constructor(id: number | { [key: string]: any; }, login?: string, passwordHash?: string) {
        const data: { [key: string]: any; } = {
            id: 0,
            login: "",
            password_hash: "",
        }

        if (typeof id == "object") {
            for (const key in data) {
                if (id.hasOwnProperty(key)) {
                    data[key] = id[key];
                }
            }
        } else {
            data.id = id;
            data.login = login;
            data.password_hash = passwordHash;
        }


        this.id = data.id;
        this.login = data.login;
        this.passwordHash = data.password_hash;
    }
}