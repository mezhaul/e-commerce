export type RegisterForm = {
    name: string,
    email: string,
    password: string,
} 

export type AuthForm = {
    email: string,
    password: string,
} 

export type FileUploader = {
    target: Element & { files?: FileList }
    currenTarget: HTMLInputElement;
}