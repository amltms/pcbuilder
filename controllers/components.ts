import { Component } from '../models/component.ts';
import {Status}  from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/postgres/mod.ts";
import {dbCreds} from '../config.ts';

//init client
const client = new Client(dbCreds);

const getComponents = async ({ response}: { response: any}) => {
    try {
        await client.connect();
        const result = await client.queryObject("SELECT * FROM components");

        response.status = Status.OK;
        response.body = {
        sucess: true,
        data: result.rows
        }
    } catch (err) {
        response.status = Status.BadRequest;
        response.body = {
            sucess:false,
            msg: err.toString()
        }  
    }finally{
        await client.end()
    }

}

const getComponent = async({params, response}: {params: {id: string}, response: any}) => {
    try {
        await client.connect()
        const result = await client.queryObject
        `SELECT * from components WHERE id = (${params.id})`;
        if(result.rows.toString() === ""){
            response.status = Status.NotFound
            response.body = {
                success: false,
                msg: 'No component found'
            }
            return;
        }else{
            response.status = Status.OK;
            response.body = {
                success: true,
                data: result.rows
            }
        }
    } catch (err) {
        response.status =Status.BadRequest
        response.body = {
        succes: false,
        msg: err.toString()
        }
    }finally{
        await client.end()
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
        try{
            await client.connect();
            const result = await client.queryObject
                `INSERT INTO components(name,type,price) VALUES(${component.name},${component.type},${component.price})`;
            response.status = Status.Accepted;
            response.body = {
                success:true,
                data: component
            }
        }catch(err){
            response.status = Status.BadRequest;
            response.body = {
                sucess:false,
                msg: err.toString()
            }
        }finally {
            await client.end()
        }
    }
}


const updateComponent = async({params, request, response}: {params: {id: string}, request: any, response: any}) => {
    await getComponent({params: {"id": params.id}, response})
    if(response.status === Status.NotFound){
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = Status.NotFound;
        return
    }else {
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
            try{
                await client.connect();
                const result = await client.queryObject
                    `UPDATE components SET name=${component.name}, type=${component.type}, price=${component.price} WHERE id=${params.id}`;
                response.status = Status.Accepted;
                response.body = {
                    success:true,
                    data: result
                }
            }catch(err){
                response.status = Status.BadRequest;
                response.body = {
                    sucess:false,
                    msg: err.toString()
            }
            }finally {
                await client.end()
            }
        }
    }
}


const deleteComponent = async({params, response}: {params: {id: string}, response: any}) => {
    await getComponent({params: {"id": params.id}, response})
    if(response.status === Status.NotFound){
        response.body = {
            success: false,
            msg: response.body.msg
        }
        response.status = Status.NotFound;
        return
    }else {
        try {
            await client.connect()
            const result = await client.queryObject(`DELETE FROM components WHERE id=${params.id}`)
            response.body = {
                success: true,
                msg: 'Product deleted'
            }
            response.status = Status.NoContent
        } catch (err) {
            response.status = Status.BadRequest
            response.body = {
                success: false,
                msg: err.toString()
            }
        }
    }
}

export { getComponents, getComponent, addComponent, updateComponent, deleteComponent}