/**
 * Handles async try catch block and global error
 *
 * @param   {[type]}  fn  []
 * @return  {[type]}      [async function]
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}
