export type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: Category,
  images: string[],
  creationAt: string,
  updatedAt: string
}

export type ItemWithId<T> = {
  item: T,
  id: number
}

export type Category = {
  id: number,
  name: string,
  image: string,
  creationAt: string,
  updatedAt: string
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