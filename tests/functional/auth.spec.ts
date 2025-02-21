import { test } from '@japa/runner'
import User from '#models/user'
import type { Group } from '@japa/runner/core'
import type { ApiClient, ApiResponse } from '@japa/api-client'
import type { Assert } from '@japa/assert'

test.group('Auth', (group: Group): void => {
  let user: User
  let token: string

  group.setup(async (): Promise<void> => {
    user = await User.create({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })
  })

  test('Un utilisateur peut se connecter avec des identifiants valides', async ({
    client,
    assert,
  }: {
    client: ApiClient
    assert: Assert
  }): Promise<void> => {
    const response: ApiResponse = await client.post('/user/login').json({
      email: user.email,
      password: 'password123',
    })

    response.assertStatus(200)
    assert.exists(response.body().token, 'Le token doit être renvoyé')

    token = response.body().token.token // Stocker le token pour d'autres tests
  })

  test('Un utilisateur ne peut pas se connecter avec un mauvais mot de passe', async ({
    client,
  }: {
    client: ApiClient
  }): Promise<void> => {
    const response: ApiResponse = await client.post('/user/login').json({
      email: user.email,
      password: 'wrongpassword',
    })

    response.assertStatus(400)
  })

  test('Un nouvel utilisateur peut être enregistré', async ({
    client,
    assert,
  }: {
    client: ApiClient
    assert: Assert
  }): Promise<void> => {
    const response: ApiResponse = await client.post('/user/register').json({
      fullName: 'New User',
      email: 'newuser@example.com',
      password: 'securepassword',
    })

    response.assertStatus(201)
    assert.equal(response.body().email, 'newuser@example.com')

    // TODO: Checker si l'utilisateur est bien insérée en base de donnée avec les bonne valeurs
    const userInDb: User | null = await User.findBy('email', 'newuser@example.com')

    // Vérifier que l’utilisateur existe
    assert.exists(userInDb, 'L’utilisateur n’a pas été trouvé dans la base de données')

    // Vérifier que les champs sont corrects
    assert.equal(userInDb?.fullName, 'New User')
    assert.equal(userInDb?.email, 'newuser@example.com')
  })

  test('Un utilisateur peut se déconnecter', async ({ client }: { client: ApiClient }): Promise<void> => {
    const response: ApiResponse = await client.post('/user/logout').bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Logged out' })
  })
})
