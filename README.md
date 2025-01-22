# Ticket Manager

## Overview

Ticket Manager is a web application designed to streamline the management of tickets for both users and admins. Users can create tickets, while admins can manage and filter them based on various criteria. The application supports features such as user authentication, ticket creation, status updates, and filtering based on status, priority, and user.

## Features

- **User Features**:
  - Create new tickets with a title, description, and priority.
  - View the list of created tickets.
  - Filter tickets by status, priority, and user.

- **Admin Features**:
  - View all tickets with additional filtering options.
  - Manage tickets by updating their statuses.
  - View detailed information about each ticket.

- **Authentication**:
  - Users and admins can log in to their respective dashboards.
  - User authentication is handled using JWT tokens for security.

## Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Django Rest Framework, SimpleJWT (for JWT-based authentication)

## Installation

### Prerequisites

- Python 3.x
- Node.js (for frontend)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ticket-manager.git
cd ticket-manager
```

### 2. Setup Backend (Django)

1. Create a virtual environment:

```bash
python -m venv venv
```

2. Activate the virtual environment:

- **Windows**: `.\venv\Scripts\activate`
- **macOS/Linux**: `source venv/bin/activate`

3. Install backend dependencies:

```bash
cd..
pip freeze > requirements.txt
pip install -r requirements.txt
cd ticket_mgmt
```

4. Apply migrations to set up the database:

```bash
python manage.py migrate
```

5. Create a superuser to access the Django admin:

```bash
python manage.py createsuperuser
```

6. Run the Django development server:

```bash
python manage.py runserver
```

### 3. Setup Frontend (React)

1. Navigate to the frontend directory:

```bash
cd frontend/ticket_mgmt
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

### 5. Test the Application

- Open the frontend in your browser by navigating to `http://localhost:3000`.
- Use the backend at `http://localhost:8000`.

## Usage

1. **User**:
   - Login to the system and create new tickets by providing a title, description, and priority.
   - Filter tickets by status, priority, and user.
   - View detailed information on each ticket.

2. **Admin**:
   - Login as an admin and manage all tickets.
   - View tickets based on filters.
   - Update the status of tickets (e.g., open, in-progress, resolved).

## API Endpoints

### Authentication

- **POST** `/api/token/` - Obtain JWT tokens (login).
- **POST** `/api/token/refresh/` - Refresh the JWT token.

### Tickets

- **GET** `/api/tickets/` - Retrieve all tickets (can filter by status, priority, and user).
- **POST** `/api/tickets/` - Create a new ticket.
- **GET** `/api/tickets/{id}/` - Retrieve a specific ticket by ID.
- **PUT** `/api/tickets/{id}/` - Update a ticket (change status or priority).
- **DELETE** `/api/tickets/{id}/` - Delete a ticket (admin only).

## Acknowledgments

- **Django**: Web framework for the backend.
- **React**: JavaScript library for building the frontend.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JWT (JSON Web Token)**: Secure method of authentication.
