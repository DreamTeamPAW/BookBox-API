import { Express } from 'express';
import bcrypt from "bcryptjs";
import User from './models/User'

export async function setupAdmin(app: Express) {
  const { default: AdminJS } = await import('adminjs');
  const AdminJSExpress = await import('@adminjs/express');
  const AdminJSMongoose = await import('@adminjs/mongoose');

  AdminJS.registerAdapter(AdminJSMongoose);

  const adminJs = new AdminJS({
    resources: [{
        resource: User,
        options: {
          properties: {
            passwordHash: { isVisible: false },
            _id: { isVisible: { list: true, filter: false, show: true, edit: false } }
          },
        },
      }],
    rootPath: `/admin`, 
    branding: { companyName: 'BookBox Admin panel'},
  });
  
  const router = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: async (email, password) => {
        const user = await User.findOne({ email });
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) return null;
        if (user.role !== 'admin') return null;

        return { email: user.email, role: user.role };
      },
      cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'secret',
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
    }
  );
  app.use(adminJs.options.rootPath, router);
}