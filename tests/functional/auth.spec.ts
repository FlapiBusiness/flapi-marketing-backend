import { test } from '@japa/runner'
import User from '#models/user'

test.group('Auth', (group) => {
  let user: User
  let token: string

  group.setup(async () => {
    user = await User.create({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    })
  })

  test('Un utilisateur peut se connecter avec des identifiants valides', async ({ client, assert }) => {
    const response = await client.post('/user/login').json({
      email: user.email,
      password: 'password123',
    })

    response.assertStatus(200)
    assert.exists(response.body().token, 'Le token doit être renvoyé')

    token = response.body().token.token // Stocker le token pour d'autres tests
  })

  test('Un utilisateur ne peut pas se connecter avec un mauvais mot de passe', async ({ client }) => {
    const response = await client.post('/user/login').json({
      email: user.email,
      password: 'wrongpassword',
    })

    response.assertStatus(400)
  })

  test('Un nouvel utilisateur peut être enregistré', async ({ client, assert }) => {
    const response = await client.post('/user/register').json({
      fullName: 'New User',
      email: 'newuser@example.com',
      password: 'securepassword',
    })

    response.assertStatus(201)
    assert.equal(response.body().email, 'newuser@example.com')
  })

  test('Un utilisateur peut se déconnecter', async ({ client }) => {
    const response = await client.post('/user/logout').bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains({ message: 'Logged out' })
  })
})
