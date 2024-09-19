# Backend Engineer Challenge

## Features

For this task, I implemented the necessary features for the following user story 
    - A user should be able to register/login with their name, email, mobile, and use two-factor authentication (2FA) involving SMS (e.g., Twilio) and a secure password.
    - The user should be able to change their name and email but not their mobile number.
    - To change the password, SMS verification is required.

## API Endpoints

### Authentication Routes
`POST /api/auth/login`: Log in a user with username/email and password.
`POST /api/auth/verify-code`: Verify the 2FA code sent via SMS.
`POST /api/auth/logout`: Log out a user.
`GET /api/auth/authenticated`: Check if the user is authenticated.
### User Routes
`POST /api/users`: Create a new user with username, email, mobile, and password.
`PUT /api/users/update`: Update user details (username, email) - 2FA required.
`PATCH /api/users/update-password`: Update user password - SMS verification required.

## Technologies Used
- Express.js for the web server
- Postgres for the backend
- Redis for session management
- Twilio for SMS-based 2FA
- Docker for containerization
- Swagger/OpenAPI for Swagger Docs

## Quick-Start
1. **Set up Twilio**. Create a Twilio developer account [here](https://login.twilio.com/u/signup?state=hKFo2SBrMGlNUGFwYlBtbWxJeUs0UXEweVZzZFY0TWlzR2JFNKFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIDFIaC0xR1dqRGdNeGJPVWp3bGdDUHMzQU0xOU5jNDNxo2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks)
2. **Configure Environment Variables**: Copy the .env.example file to .env and fill in the required credentials.
3. **Start the project**.
```
yarn docker:up
yarn migration:run 
yarn dev
```
4. Open the browser to localhost:8000/api-docs to try out the different endpoints.

## General Questions
**How much time did you spend working on the solution?**

2-3 hours

**What part of the solution are you most proud of?**

I’m particularly proud of how I set up the dev-ops tooling for this project. I dedicated some time in the beginning to configuring scripts, containerization, and Swagger documentation. This initial setup streamlined my development process and also lays a strong foundation for others to contribute to the projec in the future. 

**If you had more time, what other things would you like to do?** 

1. It definitely needs more testing! Both unit and end-to-end. I tested the functionality by calling the endpoints and inspecting the contents of the database manually, which is not a sustainable or a reliable method to ensure code quality. 
2. I think the auth flow is also a bit awkward and could be improved. I might look at blogs or other developers' github projects for inspiration on more elegant ways to implement 2FA
3. I implemented some basic security measures but I would do more research to ensure users' data would be secure before deploying to production 


**Do you have any feedback regarding this coding challenge?**

This was fun! I think it was an appropriate amount of complexity so I could showcase my skills without an overwhelming time commitment. Thanks for your consideration and I'm looking forward to feedback from the team.


