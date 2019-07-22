export default class User {
    public id: number;
    public login: string;
    public passwordHash: string;
    public banned: boolean;

    constructor(userData: { [key: string]: any; });
    constructor(id: number, login: string, passwordHash: string, banned: boolean);

    constructor(id: number | { [key: string]: any; }, login?: string, passwordHash?: string, banned?: boolean) {
        let data: { [key: string]: any; };

        if (typeof id == "object") {
            data = {
                ...id
            }
        } else {
            data = {
                id,
                login,
                password_hash: passwordHash,
                banned
            };
        }


        this.id = data.id;
        this.login = data.login;
        this.passwordHash = data.password_hash;
        this.banned = data.banned;
    }
}