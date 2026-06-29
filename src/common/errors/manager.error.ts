import { HttpStatus } from "../enums/http-status.enum";

export class ManagerError extends Error {
    constructor(
        public message: string,
        public status: keyof typeof HttpStatus,
        public code: HttpStatus,
    ){
        super(message);
    }

    //* 1xx Informational
    static continue(message: string){
        return new ManagerError(message, "CONTINUE", 100);
    }

    static switchingProtocols(message: string){
        return new ManagerError(message, "SWITCHING_PROTOCOLS", 101);
    }

    static processing(message: string){
        return new ManagerError(message, "PROCESSING", 102);
    }

    static earlyHints(message: string){
        return new ManagerError(message, "EARLYHINTS", 103);
    }

    //* 2xx Success
    static ok(message: string){
        return new ManagerError(message, "OK", 200);
    }

    static created(message: string){
        return new ManagerError(message, "CREATED", 201);
    }

    static accepted(message: string){
        return new ManagerError(message, "ACCEPTED", 202);
    }

    static nonAuthoritativeInformation(message: string){
        return new ManagerError(message, "NON_AUTHORITATIVE_INFORMATION", 203);
    }

    static noContent(message: string){
        return new ManagerError(message, "NO_CONTENT", 204);
    }

    static resetContent(message: string){
        return new ManagerError(message, "RESET_CONTENT", 205);
    }

    static partialContent(message: string){
        return new ManagerError(message, "PARTIAL_CONTENT", 206);
    }

    //* 3xx Redirection
    static ambiguous(message: string){
        return new ManagerError(message, "AMBIGUOUS", 300);
    }

    static movedPermanently(message: string){
        return new ManagerError(message, "MOVED_PERMANENTLY", 301);
    }

    static found(message: string){
        return new ManagerError(message, "FOUND", 302);
    }

    static seeOther(message: string){
        return new ManagerError(message, "SEE_OTHER", 303);
    }

    static notModified(message: string){
        return new ManagerError(message, "NOT_MODIFIED", 304);
    }

    static temporaryRedirect(message: string){
        return new ManagerError(message, "TEMPORARY_REDIRECT", 307);
    }

    static permanentRedirect(message: string){
        return new ManagerError(message, "PERMANENT_REDIRECT", 308);
    }

    //* 4xx Client Errors
    static badRequest(message: string){
        return new ManagerError(message, "BAD_REQUEST", 400);
    }

    static unauthorized(message: string){
        return new ManagerError(message, "UNAUTHORIZED", 401);
    }

    static paymentRequired(message: string){
        return new ManagerError(message, "PAYMENT_REQUIRED", 402);
    }

    static forbidden(message: string){
        return new ManagerError(message, "FORBIDDEN", 403);
    }

    static notFound(message: string){
        return new ManagerError(message, "NOT_FOUND", 404);
    }

    static methodNotAllowed(message: string){
        return new ManagerError(message, "METHOD_NOT_ALLOWED", 405);
    }

    static notAcceptable(message: string){
        return new ManagerError(message, "NOT_ACCEPTABLE", 406);
    }

    static proxyAuthenticationRequired(message: string){
        return new ManagerError(message, "PROXY_AUTHENTICATION_REQUIRED", 407);
    }

    static requestTimeout(message: string){
        return new ManagerError(message, "REQUEST_TIMEOUT", 408);
    }

    static conflict(message: string){
        return new ManagerError(message, "CONFLICT", 409);
    }

    static gone(message: string){
        return new ManagerError(message, "GONE", 410);
    }

    static lengthRequired(message: string){
        return new ManagerError(message, "LENGTH_REQUIRED", 411);
    }

    static preconditionFailed(message: string){
        return new ManagerError(message, "PRECONDITION_FAILED", 412);
    }

    static payloadTooLarge(message: string){
        return new ManagerError(message, "PAYLOAD_TOO_LARGE", 413);
    }

    static uriTooLong(message: string){
        return new ManagerError(message, "URI_TOO_LONG", 414);
    }

    static unsupportedMediaType(message: string){
        return new ManagerError(message, "UNSUPPORTED_MEDIA_TYPE", 415);
    }

    static requestedRangeNotSatisfiable(message: string){
        return new ManagerError(message, "REQUESTED_RANGE_NOT_SATISFIABLE", 416);
    }

    static expectationFailed(message: string){
        return new ManagerError(message, "EXPECTATION_FAILED", 417);
    }

    static iAmATeapot(message: string){
        return new ManagerError(message, "I_AM_A_TEAPOT", 418);
    }

    static misdirected(message: string){
        return new ManagerError(message, "MISDIRECTED", 421);
    }

    static unprocessableEntity(message: string){
        return new ManagerError(message, "UNPROCESSABLE_ENTITY", 422);
    }

    static failedDependency(message: string){
        return new ManagerError(message, "FAILED_DEPENDENCY", 424);
    }

    static preconditionRequired(message: string){
        return new ManagerError(message, "PRECONDITION_REQUIRED", 428);
    }

    static tooManyRequests(message: string){
        return new ManagerError(message, "TOO_MANY_REQUESTS", 429);
    }

    //* 5xx Server Errors
    static internalServerError(message: string){
        return new ManagerError(message, "INTERNAL_SERVER_ERROR", 500);
    }

    static notImplemented(message: string){
        return new ManagerError(message, "NOT_IMPLEMENTED", 501);
    }

    static badGateway(message: string){
        return new ManagerError(message, "BAD_GATEWAY", 502);
    }

    static serviceUnavailable(message: string){
        return new ManagerError(message, "SERVICE_UNAVAILABLE", 503);
    }

    static gatewayTimeout(message: string){
        return new ManagerError(message, "GATEWAY_TIMEOUT", 504);
    }

    static httpVersionNotSupported(message: string){
        return new ManagerError(message, "HTTP_VERSION_NOT_SUPPORTED", 505);
    }
}