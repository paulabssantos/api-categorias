export class ApplicationResponse {
    statusCode : number = 400
    message: string = ""
    body?: object
    constructor(message: string,statusCode: number = 400,body?: object){
        this.statusCode = statusCode
        this.message = message
        this.body = body
    }
}