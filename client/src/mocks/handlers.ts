import {rest} from 'msw';
import {nanoid} from '@reduxjs/toolkit';

const token = nanoid();

export const handlers = [
  rest.post('http://localhost:4500/api/v1/auth/login', async (req, res, ctx) => {
    const body = await req.text();
    const credentials = JSON.parse(body);

    if (credentials.email !== 'test@email.com' || credentials.password !== 'passworD@1') {
      return res(ctx.status(400), ctx.json('Invalid Credentails'));
    }

    return res(
      ctx.delay(100),
      ctx.json({
        user: {
          name: 'John',
          email: 'john@gmail.com',
          role: 'submitter',
        },
        token,
      })
    );
  }),
];
