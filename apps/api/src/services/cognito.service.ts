import {
  AuthFlowType,
  ForgotPasswordCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import type { Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { env } from '../env.js'
import { AbstractService } from './abstract.service.js'

const _googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export class CognitoService extends AbstractService {
  public async signIn(email: string, password: string) {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH as AuthFlowType,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.generateSecretHash(email)
      }
    }

    const command = new InitiateAuthCommand(params)
    return await this.client.send(command)
  }

  public async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string
  ) {
    const params = {
      ClientId: this.clientId,
      Username: email,
      Password: password,
      SecretHash: this.generateSecretHash(email),
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: firstName ?? '' },
        { Name: 'family_name', Value: lastName ?? '' },
        { Name: 'custom:role', Value: role ?? 'INDICATOR' }
      ],
      TemporaryPassword: 'SenhaTemporaria123!', // opcional
      MessageAction: 'SUPPRESS', //
      UserContextData: {
        IpAddress: '127.0.0.1',
        EncodedData: ''
      }
    }
    const command = new SignUpCommand(params)
    return await this.client.send(command)
  }

  public async signOut(token: string | undefined) {
    const params = {
      AccessToken: token // O token de acesso do usuário
    }
    const command = new GlobalSignOutCommand(params)
    return await this.client.send(command)
  }

  // // Confirmar o registro do usuário
  // public async confirmSignUp(email: string, confirmationCode: string) {
  //   const params = {
  //     Username: email,
  //     ConfirmationCode: confirmationCode,
  //     ClientId: this.clientId,
  //     UserPoolId: process.env.COGNITO_USER_POOL_ID!
  //   }
  //   const command = new AdminConfirmSignUpCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(
  //       `Erro ao confirmar o registro: ${(error as Error).message}`
  //     )
  //   }
  // }

  // Iniciar recuperação de senha

  public async forgotPassword(email: string) {
    const params = {
      ClientId: this.clientId,
      Username: email,
      SecretHash: this.generateSecretHash(email)
    }
    const command = new ForgotPasswordCommand(params)
    const results = await this.client.send(command)
    console.debug(results)
    return results
    // try {
    //   await this.client.send(command)
    // } catch (error) {
    //   throw new Error(
    //     `Erro ao iniciar recuperação de senha: ${(error as Error).message}`
    //   )
    // }
  }
  // // Confirmar a nova senha após a recuperação
  // public async confirmPassword(
  //   email: string,
  //   confirmationCode: string,
  //   newPassword: string
  // ) {
  //   const params = {
  //     ClientId: this.clientId,
  //     Username: email,
  //     ConfirmationCode: confirmationCode,
  //     Password: newPassword
  //   }
  //   const command = new ConfirmForgotPasswordCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`Erro ao redefinir senha: ${(error as Error).message}`)
  //   }
  // }

  // // Enviar código de verificação
  // const sendVerificationCode = async (accessToken, attribute) => {
  //   const command = new GetUserAttributeVerificationCodeCommand({
  //     AccessToken: accessToken, // token do usuário logado
  //     AttributeName: attribute, // 'email' ou 'phone_number'
  //   });

  //   const response = await client.send(command);
  //   console.log("Código de verificação enviado para:", attribute, response);
  // };

  // // Iniciar a configuração de MFA
  // public async initiateMfa(email: string) {
  //   const params = {
  //     Username: email,
  //     UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  //     MFAPreference: {
  //       EmailMfaSettings: true
  //     }
  //   }
  //   const command = new AdminSetUserMFAPreferenceCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`Erro ao iniciar MFA: ${(error as Error).message}`)
  //   }
  // }
  // // Verificar o código MFA durante o login
  // public async verifyMfa(email: string, mfaCode: string) {
  //   const params = {
  //     Username: email,
  //     UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  //     TokenCode: mfaCode
  //   }
  //   const command = new VerifySoftwareTokenCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(`Erro ao verificar MFA: ${(error as Error).message}`)
  //   }
  // }

  public async signInWithGoogle(res: Response, code: string) {
    const url = new URL(`${env.COGNITO_DOMAIN}/oauth2/authorize`)
    url.searchParams.append('response_type', 'code')
    url.searchParams.append('client_id', env.COGNITO_CLIENT_ID)
    url.searchParams.append('redirect_uri', `${env.COGNITO_REDIRECT_URI}`)
    url.searchParams.append('identity_provider', 'Google')
    url.searchParams.append('scope', 'openid email profile')
    res.redirect(url.toString()) //

    console.log(url)

    return { url, code }

    // const params = {
    //   AuthFlow: AuthFlowType.USER_PASSWORD_AUTH as AuthFlowType,
    //   ClientId: this.clientId,
    //   AuthParameters: {
    //     USERNAME: email,
    //     PASSWORD: password,
    //     SECRET_HASH: this.generateSecretHash(email)
    //   }
    // }

    // return { ok: true, data: provider }

    // const command = new InitiateAuthCommand(params)
    // return await this.client.send(command)
  }
}
