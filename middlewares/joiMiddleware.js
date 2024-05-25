// Función de captura de errores
export function catchErrors(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
}

export function joiErrors(err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    const errors = err.error.details.map((detail) => detail.message);
    res.status(400).json({ status: 1, errors });
  } else {
    next(err);
  }
}
