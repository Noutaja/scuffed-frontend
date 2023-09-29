export type Product = {
  id: number,
  title: string,
  price: number
}

/* export type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: Category,
  images: string[]
} */

export type Category = {
  id: number,
  name: string,
  image: string
}

export type User = {
  id: number,
  name: string
}

/* export type User = {
  id: number,
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string
} */