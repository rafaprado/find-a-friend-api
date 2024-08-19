export async function validateCep(rawCep: string) {
  const pattern = /^(\d{5})-?\d{3}$/

  if (!pattern.test(rawCep)) {
    return null
  }

  const cep = rawCep.replace('-', '')

  const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const _cep = await request.json()

  if (_cep.erro) {
    return null
  }

  return cep
}
