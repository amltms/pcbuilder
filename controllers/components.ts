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

const home = ({ response}: { response: any}) => {
    response.body = "Hello world!";
}

const getComponents = ({ response}: { response: any}) => {
    response.body = components
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
          msg: 'component not found'
      }
  }
}

const addComponent = async({request, response}: {request: any, response: any}) => {
  console.log("post component");
  if (!request.hasBody) {
    response.status = Status.BadRequest
    response.body = {
      success: false,
      message: "No data provided",
    };
    return;
  }
  const body = request.body();
  
  let component: Component | undefined;
  if (body.type === "json") {
    component = await body.value;
  }

  if (component) {
    component.id = v4.generate();
    components.push(component)
    response.status = Status.OK;
    response.body = component;
    response.type = "json";
    return;
  }
  throw(Status.BadRequest, "Bad Request");
}


export {home, getComponents, addComponent, getComponent}