'use strict'

"use strict";

const Database = use("Database");


class RouteController {
  async store({ request, response }) {
    const Route = use("App/Models/Route");
    const route = new Route();
    route.route_name = request.body.route_name;
    route.identifier = request.body.identifier;
    route.polylines_file = request.body.polylines_file;
    route.danger_level = request.body.danger_level;
    route.origin = request.body.origin;
    route.destination = request.body.destination;
    route.distance = request.body.distance;
    route.speed = request.body.speed;
    route.company_identifier = request.body.company_identifier;
    
    await route.save();

    return response.status(201).json(route);
  }

  async edit({ request, response }) {
    const Route = use("App/Models/Route");
    const route = await Route.find(request.body.requestId);
    route.route_name = request.body.route_name;
    route.identifier = request.body.identifier;
    route.polylines_file = request.body.polylines_file;
    route.danger_level = request.body.danger_level;
    route.origin = request.body.origin;
    route.destination = request.body.destination;
    route.distance = request.body.distance;
    route.speed = request.body.speed;
    route.company_identifier = request.body.company_identifier;
    
    await route.save();
    return response.status(201).json(route);
  }

  async routeDetails({ params, response }) {
    
    const Route = use("App/Models/Route");
    let route;

    try {
      route = await Route.findOrFail(params.id);
    } catch (e) {

      if (e.name == "ModelNotFoundException") {
        return response.send(401);
      }
    }

    return response.status(201).json(route);
  }

  async delete({ request, response }) {
    
    const Route = use("App/Models/Route");
    let route;

    try {
      route = await Route.findOrFail(request.body.requestId);
    } catch (e) {

      if (e.name == "ModelNotFoundException") {
        return response.send(401);
      }
    }

    await route.delete();
    return response.send(201);
  }

  async listAll({ response }) {

    let routes = await Database.table("routes")
    response.json(routes);
  }

  async listCompanyRoutes({ params, response }) {
    let routes = await Database.table("routes").where("company_identifier", params.id);
    let res = {

      "Routes": routes

    }

    response.json(res);
  }

}


module.exports = RouteController
