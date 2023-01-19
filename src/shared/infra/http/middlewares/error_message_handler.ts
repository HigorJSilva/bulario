import _ from 'lodash'
import { ErrorPropertyInterface } from '../../../helpers/AppResponse'

export function handleErrorMessage (erros: any[]): ErrorPropertyInterface {
  var grouped = _.groupBy(erros, function (item: {param: string}) {
    return item.param
  })
  var errorsArray = _.each(grouped, function (value: any, key: any, list: any) {
    const errors: any[] = []
    value.forEach((element: {msg: string}) => {
      errors.push(element.msg)
    })
    list[key] = errors
    return list
  })
  return errorsArray
}
