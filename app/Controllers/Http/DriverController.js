"use strict";

const Database = use("Database");

class DriverController {
  async store({ request, response }) {
    const Driver = use("App/Models/Driver");
    const driver = new Driver();
    driver.first_name = request.body.first_name;
    driver.last_name = request.body.last_name;
    driver.document = request.body.document;
    driver.birth_city = request.body.birth_city;
    driver.email = request.body.email;
    driver.birthday = request.body.birthday;
    driver.gender = request.body.gender;
    driver.verification_status = request.body.verification_status;
    driver.company_identifier = request.body.company_identifier;
    
    await driver.save();

    const User = use("App/Models/User");
    const user = new User();
    user.id = driver.id;
    user.user_name = driver.email;
    user.identifier = driver.document;
    user.rol = 3;
    user.password = "changeYourPassword";

    await user.save();

    return response.status(201).json(driver);
  }

  async edit({ request, response }) {
    const Driver = use("App/Models/Driver");
    const driver = await Driver.find(request.body.requestId);
    driver.first_name = request.body.first_name;
    driver.last_name = request.body.last_name;
    driver.document = request.body.document;
    driver.birth_city = request.body.birth_city;
    driver.email = request.body.email;
    driver.birthday = request.body.birthday;
    driver.gender = request.body.gender;
    driver.verification_status = request.body.verification_status;
    driver.company_identifier = request.body.company_identifier;

    await driver.save();
    return response.status(201).json(driver);
  }

  async driverDetails({ params, response }) {
    
    const Driver = use("App/Models/Driver");
    let driver;

    try {
      driver = await Driver.findOrFail(params.id);
    } catch (e) {

      if (e.name == "ModelNotFoundException") {
        return response.send(401);
      }
    }

    return response.status(201).json(driver);
  }

  async delete({ request, response }) {
    
    const Driver = use("App/Models/Driver");
    let driver;

    try {
      driver = await Driver.findOrFail(request.body.requestId);
    } catch (e) {

      if (e.name == "ModelNotFoundException") {
        return response.send(401);
      }
    }

    const User = use("App/Models/User");
    let user

    try {
        
        user = await User.findOrFail(request.body.requestId);
        await user.delete()

      } catch (e) {
  
        console.log(e.name)

      }

    await driver.delete();
    return response.send(201);
  }

  async listAll({ response }) {

    let drivers = await Database.table("drivers")
    response.json(drivers);
  }

  async listCompanyDrivers({ params, response }) {
    let drivers = await Database.table("drivers").where("company_identifier", params.id);

    response.json(drivers);
  }

}

module.exports = DriverController
