---

# Pawprints & Tales

[Live Link](https://pawprints-and-tales.vercel.app/)

## To test the api here is the admin credentials:

```plaintext
{
  "email": "john@admin.com",
  "password": "admin123"
}
```

## To test the api here is the user credentials:

```plaintext
{
  "email": "john@user.com",
  "password": "user123"
}
```

## Introduction

Pawprints & Tales is a frontend web application designed to provide pet lovers and owners with an engaging and informative platform for accessing pet care tips and heartwarming stories. This application offers a user-friendly and visually appealing interface where users can browse through essential pet care advice, from proper nutrition and grooming to exercise and veterinary care. Alongside these practical guides, the platform shares inspiring stories of pet adoption, rescue, and the deep bonds between pets and their humans. With a focus on creating an enjoyable experience for all pet owners, the site is accessible across devices, ensuring a seamless experience whether on mobile, tablet, or desktop.

## Project Description

This project focuses on developing a dynamic frontend application for Pawprints & Tales, designed to deliver practical pet care tips and touching stories to pet enthusiasts. The application offers a well-organized and intuitive interface that makes it easy for users to access valuable advice on maintaining their pets' health and well-being. From nutrition and grooming to veterinary visits, users will find helpful information at their fingertips.

In addition to these care tips, the platform features heartwarming tales of rescue and adoption, emphasizing the loyalty and love shared between pets and their owners. The responsive design ensures that users can enjoy the platform on any device, making it accessible and enjoyable to navigate. Overall, Pawprints & Tales serves as both an informative and emotionally engaging resource for pet owners, providing a comprehensive solution to meet the needs of a growing community of pet lovers.

## Features

- Authentication and Authorization
- Role based dashboards
- An user can create,update and delete a post
- An user can create,update and delete a comment
- An Admin can manage users and post
- Allows user to filter,search specific post
- Allows user to pay for premium posts
- Initiates payment with aamarpay

## Technology Stack

- Programming Language: TypeScript
- Frontend : Next.js 14
- Styling: Tailwind CSS
- UI Components: Next UI
- Validation Library: Zod
- Data Fetching: Tanstack Query
- Animations: Framer Motion
- Payment Method: aamarpay
- Deployment: Vercel

### Prerequisites

- Node.js
- npm(or yarn)

### Installation Steps

**Follow this simple step to clone the project:**

```bash
git clone  https://github.com/GGTuran/pet-care-client
```

**Now install the dependencies of the project:**

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:

```bash

    NEXT_PUBLIC_BASE_API = backend url
    NEXT_PUBLIC_BASE_URL = frontend url

```

## Start the server

**You can run the server in development mode**

```
npm run dev
```

## Project Structure

- **src/**: Contains application source code, including Redux services.
- **components/**: Contains React components.
- **pages/**: Contains React.js pages.
- **redux/**: Contains Redux slices and api.
- **routes/**: Contains all routing.
- **types/**: Contains all type.
- **schemas/**: Contains all schema.

# Usage

## Getting Started

To start using the Bike Rental website, follow these steps:

1. **Access the Website**: Navigate to the [Bike Rental website](https://pawprints-and-tales.vercel.app/) using your web browser.

2. **Browse Available Posts**:

   - On the homepage, you can view a list of posts.
   - Use the search bar to filter post by name, content, or category.
   - Apply filters to refine your search based on category of post.

3. **Premium Posts **:

   - User can pay for premium posts.

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:

- `200 OK`: The request was successful.
- `201 Created`: The resource was successfully created.
- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `401 Unauthorized`: Authentication failed or user does not have permissions for the requested operation.
- `403 Forbidden`: Authentication succeeded but authenticated user does not have access to the requested resource.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server..
