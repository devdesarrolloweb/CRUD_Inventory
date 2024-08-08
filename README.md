<<<<<<< HEAD
# CRUD_Inventory
=======
# CRUD Inventory API and Frontend

## Overview

This project is a simple CRUD (Create, Read, Update, Delete) application that includes a RESTful API and a frontend interface. The project is designed to manage products and providers in a database, allowing users to perform basic CRUD operations. Additionally, the frontend application includes filtering capabilities for products.

## Technologies Used

### Backend:
- **Languages:** PHP
- **Databases:** MySQL

### Frontend:
- **Libraries/Frameworks:** React.js 

## Database Schema

### Providers Table
- **id** (Primary Key, Integer)
- **name** (String)
- **address** (String)
- **phone** (String)
- **description** (Text)
- **timestamps** (Created and Updated Timestamps)

### Products Table
- **id** (Primary Key, Integer)
- **name** (String)
- **price** (Decimal)
- **description** (Text)
- **timestamps** (Created and Updated Timestamps)
- **provider_id** (Foreign Key, Integer, References Providers)

### Relationships
- Products have a foreign key `provider_id` linking each product to a specific provider.

## API Endpoints

### Products
- `GET /products` - Retrieve a list of products with optional filtering, pagination, and ordering.
- `GET /products/:id` - Retrieve a specific product by its ID.
- `POST /products` - Create a new product using JSON data in the request body.
- `PUT/PATCH /products/:id` - Update an existing product by its ID using JSON data in the request body.
- `DELETE /products/:id` - Delete a specific product by its ID.

### Providers
- `GET /providers` - Retrieve a list of providers with optional filtering, pagination, and ordering.
- `GET /providers/:id` - Retrieve a specific provider by its ID.
- `POST /providers` - Create a new provider using JSON data in the request body.
- `PUT/PATCH /providers/:id` - Update an existing provider by its ID using JSON data in the request body.
- `DELETE /providers/:id` - Delete a specific provider by its ID.

## API Features
- **Pagination:** Allows for retrieving results in a paginated format.
- **Filtering:** Supports filtering results by specific properties.
- **Ordering:** Results can be ordered by specific properties.
- **Property Limitation:** Allows limiting the properties returned in the API response.

## Frontend Application

The frontend application is built using either React.js provides a user interface for interacting with the API. The application includes the following features:
- **CRUD Operations:** Users can create, read, update, and delete products and providers.
- **Filtering:** Products can be filtered based on specific criteria.

## Getting Started

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- Set up a database : MySQL
- Install [React.js](https://reactjs.org/) 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bryanbeltran01/CRUD_Inventory.git
   cd CRUD_Inventory
   
2. Open the terminal in Visual Studio Code (`View > Terminal`), and run:

     cd my-product-app   and run:  npm start
     cd api/v1 and run: php -S localhost:8000

>>>>>>> 35be98d (initial commit)
