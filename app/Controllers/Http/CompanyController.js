"use strict";

const Database = use("Database");

class CompanyController {
  async store({ request, response }) {
    const Company = use("App/Models/Company");
    const company = new Company();
    company.social_reason = request.body.social_reason;
    company.nit = request.body.nit;
    company.email = request.body.email;
    company.state = 0;

    await company.save();
    return response.status(201).json(company);
  }

  async companyDetails({ params, response }) {
    
    const Company = use("App/Models/Company");
    let company;

    try {
      company = await Company.findOrFail(params.id);
    } catch (e) {

      if (e.name == "ModelNotFoundException") {
        return response.send(401);
      }
    }

    return response.status(201).json(company);
  }


  async edit({ request, response }) {
    const Company = use("App/Models/Company");
    const company = await Company.find(request.body.requestId);
    company.social_reason = request.social_reason;
    company.nit = request.body.nit;
    company.email = request.body.email;
    company.state = request.body.state;

    await company.save();
    return response.status(201).json(company);
  }

  async reject({ request, response }) {

    const Company = use("App/Models/Company");
    const company = await Company.find(request.body.requestId);
    company.state = 2;

    await company.save();
    return response.status(201).json(company);

  }

  async delete({ request, response }) {
    
    const Company = use("App/Models/Company");
    let company;

    try {
      company = await Company.findOrFail(request.body.requestId);
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

    await company.delete();
    return response.send(201);
  }

  async listApprovedCompanies({ response }) {
    let companies = await Database.table("companies").where("state", 1);

    response.json(companies);
  }

  
  async listRejectedCompanies({ response }) {
    let companies = await Database.table("companies").where("state", 2);

    response.json(companies);
  }

  async listWaitingCompanies({ response }) {

    let companies = await Database.table("companies").where("state", 0);

    response.json(companies);
  }

  async listAll({ response }) {

    let companies = await Database.table("companies")
    response.json(companies);
  }

  async approveCompany({ request, response }) {
    const Company = use("App/Models/Company");
    const company = await Company.find(request.body.requestId);
    company.state = 1;

    await company.save();

    const User = use("App/Models/User");
    const user = new User();
    user.id = company.id;
    user.user_name = company.social_reason;
    user.identifier = company.nit;
    user.rol = 2;
    user.password = "123";

    await user.save();

    return response.status(201).json(user);
  }
}

module.exports = CompanyController;
