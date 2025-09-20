import config from "config"
import jwt from "jsonwebtoken"

class JwtService{
    constructor(accessKey, refreshKey, accessTime, refreshTime){
        this.accessKey = accessKey
        this.refreshKey = refreshKey
        this.accessTime = accessTime
        this.refreshTime = refreshTime
    }

    geterateTokens(payload){
        const accessToken = jwt.sign(payload, this.accessKey, {expiresIn: this.accessTime})
        const refreshToken = jwt.sign(payload, this.refreshKey,{expiresIn: this.refreshTime})
        
        return {accessToken, refreshToken}
    }

    verifyAccessToken(token){
        return jwt.verify(token, this.accessKey)
    }

    verifyRefreshToken(token){
        return jwt.verify(token, this.refreshKey)
    }
}

export default new JwtService(
    config.get("access_key"),
    config.get("refresh_key"),
    config.get("access_time"),
    config.get("refresh_time"),
)