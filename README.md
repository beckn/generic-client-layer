# Generic Client Layer

## Introduction

The Generic Client Layer acts as a crucial intermediary between the client (UI) and the protocol server, enabling the seamless transformation of data to meet the precise requirements of the client application. This layer takes on the responsibility of receiving data from the protocol server and meticulously processing it to align with the anticipated format, structure, and content mandated by the client interface.

Overall, the Generic Client Layer plays a pivotal role in facilitating effective communication and data exchange between the client and server components of an application. Its optional integration, domain-agnostic nature, and versatility make it a valuable asset in modern software development environments.

## Release Notes

Latest version: 1.1.0

## Installation
To get started with this server, follow these steps:

1. Clone the repository: `git clone https://github.com/beckn/generic-client-layer`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file based on the `.env.example` template and configure the required variables.
4. Start the server: `npm start`

## Usage

- Run the server in development mode: `npm run dev`
- Run tests: `npm run test`
- Build the project: `npm run build`

## Architecture
Objective is to build domain-agnostic, reusable components for beckn applications, that can be configured and used across various domains. This requires a flexible and modular architecture, that can adapt to various domains with minimal code changes.

![Architecture](architecture.png)

This client layer offers a simplified synchronous API from multiple domains to the UI. It exposes REST APIs for the following operations:

1. Search (search)
2. Add to Cart (select)
3. Checkout (init)
4. Place Order (confirm)
5. Track Order (status and track)
6. Update Order (update)
7. Cancel Order (cancel)
8. Customer Support (support)
9. Rating (rate)

## Link to Postman Collections

[Postman Collection](https://github.com/beckn/generic-client-layer/blob/readme_update/postman/Generic%20Client%20Layer.postman_collection.json)


## Transformation Layer

Jsonata is a powerful JavaScript library commonly employed for data transformation tasks. It enables one to define complex mapping rules, allowing for the seamless conversion of JSON data from one structure to another. By specifying a mapping schema, developers can instruct Jsonata on how to interpret and manipulate the input JSON, facilitating the transformation process. The library provides a robust set of functions and operators to handle various transformation scenarios, making it a versatile tool for data manipulation tasks. With Jsonata, developers can efficiently transform JSON data to meet the specific requirements of their applications, enhancing flexibility and interoperability.
