import {v4} from 'https://deno.land/std/uuid/mod.ts';
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

const getComponent = ({params, response}: {params: {id: string}, response: any}) => {
    const component: Component|undefined = components.find(p => p.id === params.id)
    if (component){
        response.status = 200;
        response.body = {
            sucess: true,
            data: component
        }
    }else{
        response.status = 404;
        response.body = {
            sucess:false,
            msg: 'Component not found'
        }
    }
}

const addComponent = async({request, response}: {request: any, response: any}) => {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      };
      return;
    }
    console.log(body.value);

    
}

const updateComponent = ({response}: {response: any}) => {
    response.body = "update";
}

const deleteComponent = ({response}: {response: any}) => {
    response.body = "delete";
}

export {getComponents, getComponent, addComponent, updateComponent, deleteComponent}