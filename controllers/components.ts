import { Component } from '../types.ts';
import {v4} from 'https://deno.land/std/uuid/mod.ts';
import {Status}  from "https://deno.land/x/oak/mod.ts";

let components = [
  {
    id:"1",
    name: "AMD Ryzen 5 3600 CPU",
    type: "cpu",
    price: 200
  },
  {
    id:"2",
    name: "GIGABYTE motherboard",
    type: "motherboard",
    price: 100
  },
];

const getComponents = ({ response}: { response: any}) => {
  response.status = Status.OK;
    response.body = {
      sucess: true,
      data:components
    };
}

const getComponent = ({params, response}: {params: {id: string}, response: any}) => {
  const component: Component|undefined = components.find(c => c.id === params.id)
  if (component){
    response.status = Status.OK;
    response.body = {
      sucess: true,
      data: component
    }
  }else{
    response.status = 404;
    response.body = {
      sucess:false,
      msg: 'component not found'
    }
  }
}

const addComponent = async({request, response}: {request: any, response: any}) => {
  if (!request.hasBody) {
    response.status = Status.BadRequest
    response.body = {
      success: false,
      message: "No data provided",
    };
    return;
  }else{
    const body = request.body();
    const component: Component = await body.value;
    component.id = v4.generate();
    components.push(component)
    response.status = Status.OK;
    response.body = {
      sucess: true,
      data:component
    };
  }
  
}


const updateComponent = async({params, request, response}: {params: {id: string}, request: any, response: any}) => {
  const component: Component|undefined = components.find(c => c.id === params.id)
  if (component){
    const body =  request.body()
    const updateData: {name?: string, type?: string, price?: number} = await body.value;
    components = components.map(c => c.id === params.id ? {...c, ...updateData} : c)
    response.status = Status.OK;
    response.body = {
      success:true,
      data: components
    }
  }else{
    response.status = Status.NoContent;
    response.body = {
      sucess:false,
      msg: 'Component not found'
    }
  }
}


const deleteComponent = async({params, response}: {params: {id: string}, response: any}) => {
  components = components.filter(c => c.id !== params.id)
  response.body={
    success: true,
    msg: 'Component Removed'
  }
}

export { getComponents, getComponent, addComponent, updateComponent, deleteComponent}