export interface IUser{
    username:string;
    fullname:string;
    password:string;
    email:string;
    profilePic:string;
    gender:'male' | 'female';
}

export interface signUpBody extends IUser{
    confirmPassword:string;
}