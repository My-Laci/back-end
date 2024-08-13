# Backend API Documentation 🧑‍💻

## Laci Backend API 🔗

```http
  http://localhost:8080/
```

## API Endpoints

| Endpoint                             | Method | Input                                        | Description                    | Status      |
| ------------------------------------ | ------ | -------------------------------------------- | ------------------------------ | ----------- |
| /signup                              | POST   | email, name, password, code                  | Register new account           | ✅ Completed |
| /signin                              | POST   | email, password                              | Login to application           | ✅ Completed |
| /signout                             | POST   | token                                        | Logout from application        | ✅ Completed |
| /users                               | GET    | -                                            | Get all users data             | ✅ Completed |
| /users/:userId                       | GET    | userId                                       | Get user data by ID            | ✅ Completed |
| /users/:userId/updateFullName        | POST   | name                                         | Update user's full name        | ✅ Completed |
| /users/:userId/updateEmail           | POST   | oldPassword, newPassword, confirmNewPassword | Update user's email            | ✅ Completed |
| /users/:userId/updatePassword        | POST   | -                                            | Update user's password         | ✅ Completed |
| /users/:userId/requestResetPassword  | POST   | -                                            | Request OTP for password reset | ✅ Completed |
| /users/:userId/resetPassword         | POST   | -                                            | Reset user's password          | ✅ Completed |
| /users/:userId/verifyEmail           | POST   | -                                            | Verify user's email            | ✅ Completed |
| /users/:userId/sendEmailVerification | POST   | -                                            | Request OTP for email verif    | ✅ Completed |

## How to run this API on your local machine 💻

If you want to run this API Server on your local machine, you need to do this steps:

1. Clone this repository. `git clone -b master https://github.com/SkinEctive/Cloud-Computing.git`
2. Change directory to the root project
3. Type `npm ci` in the terminal to install all dependencies needed.
4. Activate your xampp and create database name `skinective_test3`.
5. Type `npx prisma migrate dev` in the terminal to migrate your databases (if needed, type `npx prisma generate` first).
6. Run your application with `npm run start-dev` in the terminal.