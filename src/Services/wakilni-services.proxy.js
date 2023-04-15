import * as constFile from "../WakilniConst";
import axios from "axios";

const LOGIN = constFile.LOGIN;
export const Login = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + LOGIN}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const SIGNUP = constFile.SIGNUP;
export const Signup = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + SIGNUP}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const CREATE_PRODUCT = constFile.CREATE_PRODUCT;
export const CreateProduct = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + CREATE_PRODUCT}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const LIST_PRODUCTS = constFile.LIST_PRODUCTS;
export const getProducts = (data) => {
    return axios
        .get(`${process.env.REACT_APP_URL + LIST_PRODUCTS}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const GET_PRODUCT_BY_ID = constFile.GET_PRODUCT_BY_ID;
export const getProductById = (id) => {
    return axios
        .get(`${process.env.REACT_APP_URL + GET_PRODUCT_BY_ID}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const UPDATE_PRODUCT = constFile.UPDATE_PRODUCT;
export const UpdateProduct = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + UPDATE_PRODUCT}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const DELETE_PRODUCT = constFile.DELETE_PRODUCT;
export const DeleteProduct = (id) => {
    return axios
        .delete(`${process.env.REACT_APP_URL + DELETE_PRODUCT}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const CREATE_ITEM = constFile.CREATE_ITEM;
export const CreateItem = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + CREATE_ITEM}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const LIST_ITEMS_BY_PRODCT_ID = constFile.LIST_ITEMS_BY_PRODCT_ID;
export const getItems = (product_type_id) => {
    return axios
        .get(`${process.env.REACT_APP_URL + LIST_ITEMS_BY_PRODCT_ID}/${product_type_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const GET_ITEM_BY_ID = constFile.GET_ITEM_BY_ID;
export const getItemById = (id) => {
    return axios
        .get(`${process.env.REACT_APP_URL + GET_ITEM_BY_ID}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const UPDATE_ITEM = constFile.UPDATE_ITEM;
export const UpdateItem = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + UPDATE_ITEM}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const DELETE_ITEM = constFile.DELETE_ITEM;
export const DeleteItem = (id) => {
    return axios
        .delete(`${process.env.REACT_APP_URL + DELETE_ITEM}/${id}`)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const SOLD = constFile.SOLD;
export const setIsSold = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + SOLD}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};

const NOT_SOLD = constFile.NOT_SOLD;
export const setIsNotSold = (data) => {
    return axios
        .post(`${process.env.REACT_APP_URL + NOT_SOLD}`, data)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });
};