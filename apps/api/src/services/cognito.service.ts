import {
  AuthFlowType,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { AbstractService } from './abstract.service.js'

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

  // // Iniciar recuperação de senha
  // public async forgotPassword(email: string) {
  //   const params = {
  //     ClientId: this.clientId,
  //     Username: email
  //   }
  //   const command = new ForgotPasswordCommand(params)
  //   try {
  //     await this.client.send(command)
  //   } catch (error) {
  //     throw new Error(
  //       `Erro ao iniciar recuperação de senha: ${(error as Error).message}`
  //     )
  //   }
  // }
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
}
