# Book & Student Management Website

This is a web application for an online book store where students can browse and read the details of books and the admin can manage the whole process of adding books, students and update them.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Credits](#credits)
- [Contact](#contact)

## Features

- User authentication: Admin and student can register, log in, and manage their accounts.
- Browse books: Users can view books with the details of image, author, and title.
- Admin panel: Administrators can manage books and edit & delete them, register students, edit them and can view the overall couts of books in  stock, number of registered student and admin count.
- Add, Delete, Edit Books : Only Admin role can use these function.
- Register Students details : Only Admin role can use these function.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: https://github.com/Brindha-Asokan/Book-Student-Management-System

2. Navigate to the project directory:

3. Install dependencies: npm install

4. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the following environment variables:
  ```
  DATABASE_URI=your_database_connection_string
  SECRET_KEY=your_secret_key
  SECRET_KEY_STUDENT=your_secret_key
  ```

5. Run the application: Front end - npm run dev, Backend - npm start

6. Access the application at `http://localhost:3000` in your web browser.

## Usage

- Create a new admin credentials by running 'seed.js' file.
- Click on a 'Books' to view detailed information of books.
- Admins can access 'Home', 'Books', 'Login','Dashboard', 'Add Book', 'Add Student' tabs.
- Students can access 'Home', 'Books' and 'Login' tabs.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure they are properly tested.
- Commit your changes and push to your fork.
- Submit a pull request with a detailed description of your changes.

## Credits

- [Book cover images](https://www.canva.com/) from Canva.
- [Database](https://www.mongodb.com/) powered by MongoDB.

## Contact

For questions, feedback, or support, contact the project maintainer at [brindhaasokann@gmail.com](mailto:brindhaasokann@gmail.com).
