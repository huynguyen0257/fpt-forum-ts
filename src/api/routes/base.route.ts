import { Router } from "express";

export default interface IRoute<T>{
    // readonly _route: Router;
    // readonly _controller: T;
    // readonly _middleWares: object;
    route: Router;
    init(): void;
    setupGlobalMiddleware(): void;
}