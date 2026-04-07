export const emailConfirmacion = ({ nombre, token }) => `
<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Confirmar Cuenta</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          
          <!-- Contenedor -->
          <table width="500" style="background:#ffffff; border-radius:12px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            
            <!-- Logo / Nombre -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0; color:#14B86A;">FinTrack</h2>
              </td>
            </tr>

            <!-- Título -->
            <tr>
              <td style="text-align:center;">
                <h1 style="margin:0; font-size:22px; color:#111;">
                  Confirma tu cuenta
                </h1>
              </td>
            </tr>

            <!-- Texto -->
            <tr>
              <td style="padding:20px 0; text-align:center; color:#555;">
                <p>Hola <strong>${nombre}</strong>,</p>
                <p>
                  Gracias por registrarte en FinTrack. 
                  Confirma tu cuenta para comenzar a gestionar tu dinero.
                </p>
              </td>
            </tr>

            <!-- Botón -->
            <tr>
              <td align="center" style="padding:20px 0;">
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}"
                   style="background:#14B86A; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; display:inline-block;">
                  Confirmar Cuenta
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding-top:30px; text-align:center; color:#aaa; font-size:12px;">
                <p>© ${new Date().getFullYear()} FinTrack</p>
                <p>Controla tu dinero. Toma el control de tu futuro.</p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
`;

export const emailResetPassword = ({ nombre, token }) => `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f4f6f8;font-family:Arial;">
  <table width="100%" cellpadding="0">
    <tr><td align="center" style="padding:40px;">
      
      <table width="500" style="background:#fff;padding:40px;border-radius:12px;">
        
        <tr>
          <td align="center">
            <h2 style="color:#14B86A;margin:0;">FinTrack</h2>
            <h1 style="font-size:22px;">Restablecer contraseña</h1>
          </td>
        </tr>

        <tr>
          <td style="text-align:center;color:#555;">
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>Has solicitado cambiar tu contraseña.</p>
          </td>
        </tr>

        <tr>
          <td align="center">
            <a href="${process.env.FRONTEND_URL}/change-password/${token}"
              style="background:#ef4444;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">
              Cambiar Contraseña
            </a>
          </td>
        </tr>

        <tr>
          <td style="text-align:center;color:#999;font-size:12px;">
            <p>Este enlace expirará pronto.</p>
            <p>Si no solicitaste esto, ignora el mensaje.</p>
          </td>
        </tr>

      </table>

    </td></tr>
  </table>
</body>
</html>
`;