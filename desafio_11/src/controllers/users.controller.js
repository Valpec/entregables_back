import { userService } from "../services/service.js"


const putPremiumUserController = async(req, res) => {
    try{
        let user = await userService.changeRoleUser(req.params.uid)
        res.status(201).send({message: "Rol de usuario actualizado con exito"});

    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo actualizar la informacion del usuario"});
    }

}

const resetPassword = async(req, res) => {
    console.log('entra')
    try{
        const { newPassword } = req.body;
        let user = await userService.changePassword(newPassword)

        res.status(201).send({message: "Rol de usuario actualizado con exito"});

    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo actualizar la informacion del usuario"});
    }

}

export {putPremiumUserController, resetPassword}