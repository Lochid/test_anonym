export interface RegistrationRequest {
    login: string;
    password: string;
}

export interface RegistrationResponse {
    id: number;
    login: string;
}
