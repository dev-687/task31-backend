const jwt= require("jsonwebtoken");
const secret_key="Dev@MERNSTACKeNGINNER2025";

const setUser=(user)=>{
    return jwt.sign(user,secret_key);
}

const getUser=(token)=>{
    if(!token) return null;
    return jwt.verify(token,secret_key);
}

module.exports={
    setUser,
    getUser
}
