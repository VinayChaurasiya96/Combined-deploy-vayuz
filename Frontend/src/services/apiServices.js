let IPAdress =  "http://localhost:8000/";

export const apiService = {
    addUser: IPAdress + "admin/v1/user/add",
    getAllUser: IPAdress + "admin/v1/user/allusers",
    getSingleUser: IPAdress + "admin/v1/user",
    editUser: IPAdress + "admin/v1/user/update",
    removeUser: IPAdress + "admin/v1/user/delete"

}