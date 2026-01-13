## Getting Started

## Prerequisites

Before running this project, make sure you have the following installed:

- **Java 17 or higher** - [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Maven** - [Download here](https://maven.apache.org/download.cgi)
- **Node.js and npm** - [Download here](https://nodejs.org/)
- **Angular CLI** - Install globally with `npm install -g @angular/cli`

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/HarshSWE/supply-guard.git
cd supply-guard
```

### 2. Configure the Backend

The backend requires an API key from NewsAPI to function properly.

#### Get your NewsAPI Key

1. Go to [https://newsapi.org/](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key from the dashboard

#### Create the Configuration File

1. Navigate to the backend resources folder:

```bash
   cd backend/src/main/resources
```

2. Create a new file named `application.properties`

3. Add the following configuration to the file:

```properties
   news.api.key=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your actual NewsAPI key.

### 3. Running the Application

You'll need two terminal windows - one for the backend and one for the frontend.

#### Terminal 1: Start the Backend

```bash
# From root directory
cd backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080` (or the port configured in your application.properties).

#### Terminal 2: Start the Frontend

```bash
# From root directory
cd frontend
ng serve
```

The frontend will start on `http://localhost:4200`.

### 4. Access the Application

Open your web browser and navigate to:

```
http://localhost:4200
```
### Demo Pictures

<img width="1919" height="876" alt="Picture1" src="https://github.com/user-attachments/assets/a7553ca7-729a-4003-a4d6-c77fbe23c1f1" />

<br/><br/><br/>

<img width="1918" height="881" alt="Picture2" src="https://github.com/user-attachments/assets/27627f75-55c0-41ff-96b2-4ed28e649b24" />

<br/><br/><br/>

<img width="1919" height="873" alt="Picture3" src="https://github.com/user-attachments/assets/26203306-81be-44b9-a421-79b2e4d665f8" />

<br/><br/><br/>

<img width="1919" height="876" alt="Picture4" src="https://github.com/user-attachments/assets/e925c931-9cec-4376-812b-41fb99f7844e" />
