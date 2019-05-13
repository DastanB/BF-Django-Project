
export interface ICategory {
    id: number;
    name: string;

  }

  export interface IBrand {
      id: number;
      name: string;

    }

export interface IProduct{
    id: number;
    name: string;
    price: number;
    category:Category;
    brand: Brand;
    user :IUser;
  }

export interface IComment {
    id: number;
    message: string;
    product: Product;
    user :IUser;
    }

export interface IOrder {
    id: number;
    product: Product;
    user :IUser;
    }

export interface IAuthResponse {
    token: string;
  }
export interface IUser {
    username: string,
    password: string,
    email: string
  }
