// 5 characters long
// numeric characters only
// if zip code valid -> move to next middleware function
// if NOT valid -> move to error handler function
function validateZip(req, res, next) {
  const zip = req.params.zip;
  if (zip.length !== 5 || isNaN(zip)) {
    next(`Zip (${zip}) is invalid!`);
  } else {
    next();
  }
}

module.exports = validateZip;
