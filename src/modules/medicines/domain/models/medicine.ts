export interface Medicine {
  idProduto: number
  numeroRegistro: String
  nomeProduto: String
  expediente: String
  razaoSocial: String
  cnpj: String
  numeroTransacao: String
  data: Date
  numProcesso: String
  idBulaPacienteProtegido: String
  idBulaProfissionalProtegido: String
  dataAtualizacao: Date
}

export interface DetailedMedicine {
  codigoProduto: number
  tipoProduto: number
  dataProduto: Date
  nomeComercial: string
  classesTerapeuticas: any[]
  numeroRegistro: string
  dataVencimento?: any
  mesAnoVencimento: string
  codigoParecerPublico?: any
  codigoBulaPaciente: string
  codigoBulaProfissional: string
  dataVencimentoRegistro: Date
  principioAtivo: string
  medicamentoReferencia?: any
  categoriaRegulatoria: string
  classeTerapeutica?: any
  atc?: any
  processosMedidaCautelar: any[]
  empresa: Empresa
  processo: Processo
  apresentacoes: Apresentaco[]
  rotulos: any[]
  anexoRotulos: any[]
}

export interface Empresa {
  cnpj: string
  razaoSocial: string
  numeroAutorizacao: string
}

export interface Processo {
  numero: string
  situacao: number
}

export interface EmbalagemPrimaria {
  tipo: string
  observacao?: any
}

export interface EmbalagemSecundaria {
  tipo: string
  observacao?: any
}

export interface EmbalagemSecundariaToda {
  tipo: string
  observacao?: any
}

export interface FabricantesNacionai {
  fabricante: string
  cnpj: string
  pais: string
  uf: string
  cidade: string
  etapaFabricacao: string
}

export interface Apresentaco {
  codigo: number
  apresentacao: string
  formasFarmaceuticas: string[]
  numero: number
  tonalidade?: any
  dataPublicacao: Date
  validade: string
  tipoValidade: string
  registro: string
  principiosAtivos: string[]
  complemento?: any
  embalagemPrimaria: EmbalagemPrimaria
  embalagemSecundaria: EmbalagemSecundaria
  embalagemSecundariaTodas: EmbalagemSecundariaToda[]
  envoltorios: any[]
  acessorios: any[]
  acondicionamento?: any
  marcas: any[]
  fabricantesNacionais: FabricantesNacionai[]
  fabricantesInternacionais: any[]
  viasAdministracao: string[]
  ifaUnico: boolean
  conservacao: string[]
  restricaoPrescricao: string[]
  restricaoUso: string[]
  destinacao: string[]
  restricaoHospitais: string
  tarja: string
  medicamentoReferencia: string
  apresentacaoFracionada: string
  dataVencimentoRegistro?: any
  inativa: boolean
  emAnalise: boolean
  ativa: boolean
}
