export enum Endpoint {
  ServerPath = 'http://localhost:4000',
  Signin = 'http://localhost:4000/auth/sign-in',
  RefreshToken = 'http://localhost:4000/auth/refresh-token',
  GetUser = 'http://localhost:4000/users/:id',
  GetMyInfo = 'http://localhost:4000/users/me',
  GetAllUsers = 'http://localhost:4000/users',
  Bank = 'http://localhost:4000/banks/:id',
  Banks = 'http://localhost:4000/banks',
  UploadBankLogo = 'http://localhost:4000/banks/upload-logo/:id',
}
