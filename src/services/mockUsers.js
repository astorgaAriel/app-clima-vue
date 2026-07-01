const usuarios = [
  {
    id: 1,
    nombre: 'demo demo',
    email: 'demo@demo.cl',
    password: '123456',
    favoritos: ['santiago', 'valparaiso'],
    preferencias: { unidad: 'C', tema: 'claro' }
  },
  {
    id: 2,
    nombre: 'Ariel Ariel',
    email: 'ariel@demo.cl',
    password: 'abc123',
    favoritos: ['pirque', 'san_jose_de_maipo'],
    preferencias: { unidad: 'F', tema: 'oscuro' }
  }
]

export async function mockLogin(email, password) {
  await new Promise(r => setTimeout(r, 600))
  const usuario = usuarios.find(u => u.email === email && u.password === password)
  if (usuario) {
    const { password: _, ...sinPassword } = usuario
    return { success: true, usuario: { ...sinPassword } }
  }
  return { success: false, mensaje: 'Correo o contraseña incorrectos' }
}

export async function mockRegister(nombre, email, password) {
  await new Promise(r => setTimeout(r, 600))
  const existe = usuarios.find(u => u.email === email)
  if (existe) {
    return { success: false, mensaje: 'Ya existe una cuenta con ese correo' }
  }
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    password,
    favoritos: [],
    preferencias: { unidad: 'C', tema: 'claro' }
  }
  usuarios.push(nuevoUsuario)
  const { password: _, ...sinPassword } = nuevoUsuario
  return { success: true, usuario: { ...sinPassword } }
}
