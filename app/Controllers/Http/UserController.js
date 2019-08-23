"use strict";

const Database = use("Database");

class UserController {

  async listAll({ response }) {

    let users = await Database.table("users")
    response.json(users);
  }

  async login({ request, auth, session, response }) {
    const { user_name, password } = request.all();

    try {

      await auth.attempt(user_name, password);

    } catch (e) {

      
      
      //console.log(e.status); // equals 500
      console.log(e.name); // equals MyCustomError

      if(e.name == "PasswordMisMatchException"){
        return response.send(401)
      }else if(e.name == "UserNotFoundException"){
        return response.send(401)
      }

      //console.log(e.message); // Something bad happened
      //console.log(e.stack); // Error stack with correct reference to filepath and linenum
      //console.log(e.toString()); // MyCustomError: Something bad happened 

    }

    const User = use("App/Models/User");
    var user = await User.findBy("user_name", user_name);
    
    session.put("rol", user.rol);

    if (user.rol == 1) {

      const PlatformUser = use("App/Models/PlatformUser");
      const platformuser = await PlatformUser.findBy(
        "identifier",
        user.identifier
      );

      platformuser.rol = 1;

      session.put("name", user.user_name);
      auth.user.username = user.user_name;

      response.json(platformuser);

    } else if (user.rol == 2) {

      const Company = use("App/Models/Company");
      const company = await Company.findBy("nit", user.identifier);

      company.rol = 2;

      session.put("name", user.user_name);
      auth.user.username = user.user_name;

      response.json(company);

    } else if (user.rol == 3) {

      const Driver = use("App/Models/Driver");
      const driver = await Driver.findBy("document", user.identifier);

      driver.rol = 3;

      session.put("name", user.user_name);
      auth.user.username = user.user_name;

      response.json(driver);
    }
  }
}

module.exports = UserController;
