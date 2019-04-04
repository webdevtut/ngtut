module.exports = {
  normalizederrors : function (errors) {
    let normalizederrors = [];

    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        normalizederrors.push({title:property, detail:errors[property].message })
     }
    }
  }
}
