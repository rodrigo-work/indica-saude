export interface LoginAuthResponse {
  accessTokenIDP: string
  refreshTokenIDP: string
  accessTokenAPIM: string
  expiresIn: number
  roles: Role[]
}

export interface Role {
  module: string
  grants: string[]
}
