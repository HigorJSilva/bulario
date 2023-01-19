
export interface ErrorPropertyInterface { [key: string]: string[] }

interface ResponseInterface {
  status: Boolean
  mensagem: String | null
  dados: any[] | Object | null
  erros: ErrorPropertyInterface | null
}

function AppResponse
(
  status: Boolean,
  mensagem: String | null,
  dados: any[] | Object | null,
  erros: ErrorPropertyInterface | null
): ResponseInterface {
  const resposta: ResponseInterface = { status, mensagem, dados, erros }
  return resposta
}

export default AppResponse
