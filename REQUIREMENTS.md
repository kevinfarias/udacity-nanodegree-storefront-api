# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Categories

- Index: GET /api/categories
- Show: GET /api/categories/:id
- Create:
  - -> POST /api/categories
  - -> Headers: Bearer token
  - -> Body parameters: {
    - name: string,
  - }

#### Products

- Index: GET /api/products
- Show: GET /api/products/:id
- Create:
  - -> POST /api/products
  - -> Headers: Bearer token
  - -> Body parameters: {
    - name: string,
    - price: float,
    - category: integer (references to category table)
  - }
- Top 5 most popular products: GET /api/products/top/:qt
- Products by category: GET /api/products/category/:category_id

#### Users

- Login: POST /api/login
  - Body parameters: {
    - username: string
    - password: string
  - }
- Index: GET /api/users
  - Headers: Bearer token
- Show: GET /api/users/:id
  - Headers: Bearer token
- Create: POST /api/users
  - Body parameters: {
    - username: string
    - password: string
    - firstName: string
    - lastName: string
  - }

#### Orders

- Insert a new order: POST /orders
  - Headers: Bearer token
  - Body: {
    - userid: number,
    - complete: boolean,
    - products: object[]: [
      - {
        - product: number,
        - quantity: number
      - }
      - ...
    - ]
  - }
- Current Order by user: GET /orders/current
  - Headers: Bearer token
- Completed Orders by user: GET /orders/completed
  - Headers: Bearer token

## Data Shapes

#### Category: table `categories`

- id: integer, primary key
- name: string

#### Product: table `products`

- id: integer, primary key
- name: string
- price: float
- category: integer, foreign key, references categories.id

#### User: table `users`

- id: integer, primary key
- firstName: string
- lastName: string
- password: string

#### Orders: table `orders`

- id: integer, primary key
- user_id: integer, foreign key, references users.id
- complete: boolean

### Products in orders: table `orders_products`

- id: bigint, primary key
- orderid: integer, foreign key, references orders.id
- product: integer, foreign key, references products.id
- quantity (of product in order): integer, minimal value: 1
