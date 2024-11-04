# RT-ILS (Radiotherapy Incident Learning System)
# Overview
RT-ILS is a full-stack incident management system tailored for radiotherapy environments. It integrates a React-based frontend for an intuitive user interface with a Node.js/Express backend and an SQLite database for efficient and lightweight data storage. The system features a modular design and reusable components, providing a dynamic and responsive user experience suitable for local development and deployment.
# Key Features
-	Export Functionality: Easily export incident data in a structured CSV format, enabling integration with various risk management (RM) and data analysis tools, both general and specialized in healthcare/radiotherapy.
-	Password Protection: Access to incident analysis and modification requires a password, securing sensitive information against unauthorized access.
-	Guideline Alignment: RT-ILS is designed as a reference system aligned with radiotherapy incident management best practices. Any use or adaptation of the program is at the user's own risk, as regulatory and institutional requirements may differ.
# Summary for Developers
RT-ILS is a full-stack incident reporting and management system that combines a React frontend with a Node.js/Express backend and uses sqlite3 for seamless data handling. The backend interacts with a single, file-based SQLite database, eliminating the need for an external database server, and making local data storage and retrieval simple and efficient. This architecture is highly suitable for local development and testing.
# Setup and Installation
To set up RT-ILS, follow these steps:
1.	Install Node.js
Download the Node.js installer here: Node.js Installer
(No extra tools are required for this installation.)
2.	Install Visual Studio Code
Download Visual Studio Code here: Visual Studio Code
3.	Clone this project using Git
Open a terminal and execute:
git clone https://github.com/your-username/RT-ILS.git
or download zip and extract manually.
4.	Open the Project in VS Code
Open the cloned project folder in Visual Studio Code.
5.	Install Dependencies
In the VS Code terminal, run:
npm install
Optional: If npm isn’t executable in VS Code, open PowerShell as administrator and set the execution policy:
Set-ExecutionPolicy RemoteSigned
Confirm the prompt with A.
6.	Database Initialization
-	Optional: A small sample database with test entries is available.
-	To initialize a new database, run:
node ./src/db/initializeDatabase.js
-	To test database connectivity and query some sample data:
node ./src/db/testDatabase.js
7.	Add or change the admin user credentials in settings.json.
8.	Start the Application
In the VS Code terminal, start the development server:
npm run dev
9.	Stop the Application
To stop the application, press CTRL+C in the VS Code terminal.
________________________________________
Enjoy using RT-ILS, and feel free to adapt it for further applications in radiotherapy risk management. Remember, any adaptation should be done responsibly, considering the context and regulations of your environment.
