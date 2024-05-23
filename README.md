# Banking App

This is a simple banking application built with React Native. The app allows users to manage their accounts, perform transactions, and view transaction history.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styles](#styles)
- [APIs](#apis)
- [License](#license)

## Features

- User login
- Profile management
- Withdraw and deposit money
- View transaction history
- Change PIN
- Edit profile details
- Send money to other accounts

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suanaprebibaj/mobile-application.git

2. **Navigate to the project directory:**
   ```bash
  mobile-application
3. **Install dependencies:**
    ```bash
   npm install
4. **Run the app:**
    ```bash
   npx expo start
## Usage
After starting the app, use an emulator or connect a physical device to interact with the application. The initial screen is the login screen where you can enter your credentials to access your account.
## Components
`login.js`
Handles user authentication. Users can enter their credentials to log in to the app.

`profile.js`
Displays user profile information and provides options to edit profile details.

`withdraw.js`
Allows users to withdraw money from their account. Includes input validation and a confirmation modal.

`deposit.js`
Enables users to deposit money into their account.

`language.js`
Provides language selection options.

`actions.js`
Displays actions that the user can perform, such as withdrawing or depositing money.

`transaction.js`
Shows the transaction history for the user’s account. Fetches data from the API and displays it in a scrollable list.

`send.js`
Allows users to send money to other accounts.

`changePin.js`
Provides an interface for users to change their account PIN.

`editProfile.js`
Allows users to edit their profile information.'

   
