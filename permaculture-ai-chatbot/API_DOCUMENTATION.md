# API Documentation

## Authentication

### Register
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "username": "johndoe"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
  ```

### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "session": {
      "access_token": "your_access_token",
      "refresh_token": "your_refresh_token"
    }
  }
  ```

### Logout
- **URL:** `/api/auth/logout`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer your_access_token`
- **Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

## Farm Enterprises

### Create Farm Enterprise
- **URL:** `/api/farm-enterprises`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer your_access_token`
- **Body:**
  ```json
  {
    "name": "Green Acres",
    "website_url": "https://greenacres.com",
    "instagram_url": "https://instagram.com/greenacres",
    "facebook_url": "https://facebook.com/greenacres",
    "twitter_url": "https://twitter.com/greenacres"
  }
  ```
- **Response:**
  ```json
  {
    "id": "farm_enterprise_id",
    "name": "Green Acres",
    "website_url": "https://greenacres.com",
    "instagram_url": "https://instagram.com/greenacres",
    "facebook_url": "https://facebook.com/greenacres",
    "twitter_url": "https://twitter.com/greenacres",
    "user_id": "user_id",
    "created_at": "2023-06-01T12:00:00Z"
  }
  ```

### Get Farm Enterprises
- **URL:** `/api/farm-enterprises`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer your_access_token`
- **Response:**
  ```json
  [
    {
      "id": "farm_enterprise_id",
      "name": "Green Acres",
      "website_url": "https://greenacres.com",
      "instagram_url": "https://instagram.com/greenacres",
      "facebook_url": "https://facebook.com/greenacres",
      "twitter_url": "https://twitter.com/greenacres",
      "user_id": "user_id",
      "created_at": "2023-06-01T12:00:00Z"
    }
  ]
  ```

## Testing API Calls Locally

1. Start the server:
   ```
   npm run dev
   ```

2. Use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to make API requests.

3. Example curl commands:

   Register a user:
   ```
   curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123","username":"johndoe"}'
   ```

   Login:
   ```
   curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123"}'
   ```

   Create a farm enterprise (replace `your_access_token` with the token received from login):
   ```
   curl -X POST http://localhost:3000/api/farm-enterprises -H "Content-Type: application/json" -H "Authorization: Bearer your_access_token" -d '{"name":"Green Acres","website_url":"https://greenacres.com"}'
   ```

   Get farm enterprises:
   ```
   curl -X GET http://localhost:3000/api/farm-enterprises -H "Authorization: Bearer your_access_token"
   ```

Remember to replace `your_access_token` with the actual token received after logging in.
