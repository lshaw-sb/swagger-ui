import {addBreakToPipelineBefore } from "core/utils"

export const updateSpec = (ori, {specActions}) => (...args) => {

  addBreakToPipelineBefore(() => ori(...args),"updateSpec")
  addBreakToPipelineBefore(() => specActions.parseToJson(...args),"parseToJson")
}

export const updateJsonSpec = (ori, {specActions}) => (...args) => {

  addBreakToPipelineBefore(() => ori(...args),"updateJsonSpec")
  addBreakToPipelineBefore(() => ori(specActions.resolveSpec(...args)),"resolveSpec")
}

// Log the request ( just for debugging, shouldn't affect prod )
export const executeRequest = (ori, { specActions }) => (req) => {
  specActions.logRequest(req)
  return ori(req)
}

export const validateParams = (ori, { specSelectors }) => (req) => {
  return ori(req, specSelectors.isOAS3())
}
