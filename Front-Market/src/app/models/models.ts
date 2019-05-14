

  export interface Brand {
    id: number;
    name: string;
  }

  export interface Category {
    id: number;
    name: string;
  }

  export interface Product {
    id: number;
    name: string;
    category: Category;
    brand: Brand;
    price: number;
  }
  
  export interface Order {
    id: number;
    product: Product;
    user: IUser;
  }


export interface IAuthResponse {
    token: string;
  }
export interface IUser {
    username: string,
    password: string,
    email: string
  }

  export interface Comment {
    id: number;
    message: string;
    product: Product;
    user: IUser;
  }