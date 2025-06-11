Password Manager
A simple and secure Password Manager built using React, Node.js, and MongoDB. This application allows users to securely store and manage their passwords, offering features such as adding, editing, deleting, and viewing saved passwords. Passwords are masked for privacy, and users can copy their passwords and other information directly from the app.
visit website:"https://password-manager-1-llln.onrender.com"

Features
Add Passwords: Users can add their website URLs, usernames, and passwords.

Edit Passwords: Users can edit previously saved passwords.
Delete Passwords: Users can delete passwords they no longer need.

Copy Passwords: Passwords, usernames, and URLs can be copied to the clipboard for easy use.

Password Masking: Passwords are always masked (*****), and can be toggled to reveal the password.

Password Management: View, edit, and delete saved passwords with ease.

Technologies Used
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT or any relevant method (if applicable)

API Requests: Axios

UI: Tailwind CSS for styling and Lord Icon animations for better UI experience

Installation
Backend Setup
Clone this repository:

bash
Copy
Edit
git clone https://github.com/kundan-kumar07/Password-Manager.git
Navigate to the backend folder:

bash
Copy
Edit
cd Password-Manager/backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file and add your environment variables:

bash
Copy
Edit
MONGO_URI=your_mongo_connection_string
PORT=4000
Run the backend server:

bash
Copy
Edit
npm start
Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd Password-Manager/frontend
Install dependencies:

bash
Copy
Edit
npm install
Update the API URL in the frontend code if needed (in the Manager component or the API configuration file).

Run the frontend server:

bash
Copy
Edit
npm start
The app should now be running on http://localhost:3000 for the frontend and http://localhost:4000 for the backend.

Usage
Add a new password:

Enter the website URL, username, and password in the form and click "Add Password" to save it.

Edit a password:

Click the "Edit" icon next to a saved password to update the information.

Delete a password:

Click the "Delete" icon to remove a password from the list.

Copy a password:

Click the clipboard icon next to the website URL, username, or password to copy the respective information.

API Endpoints
GET /passwords: Retrieve all saved passwords.

POST /add: Add a new password.

Request body: { "url": "example.com", "username": "user", "password": "password123" }

PUT /update/:id: Update an existing password by its ID.

Request body: { "url": "example.com", "username": "user", "password": "newpassword123" }

DELETE /delete/:id: Delete a password by its ID.

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests with improvements or bug fixes.
