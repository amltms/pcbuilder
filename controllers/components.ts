import { Component } from '../types.ts';
let components = [
    {
        id:"1",
        name: "AMD Ryzen 5 3600 CPU",
        type: "cpu",
        price: 150.00
    },
    {
        id:"2",
        name: "GIGABYTE motherboard",
        type: "motherboard",
        price: 90.00
    },
];

//@desc get all components
//@route get /components

const getComponents = ({response}: {response: any}) => {
    response.body = { 
        sucess: true,
        data: components
    }
}

const getComponent = ({response}: {response: any}) => {

}

const addComponent = ({response}: {response: any}) => {

}

const updateComponent = ({response}: {response: any}) => {

}

const deleteComponent = ({response}: {response: any}) => {

}

export {getComponents}