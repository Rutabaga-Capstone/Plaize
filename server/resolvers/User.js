function plants(parent, args, context) {
  return context.apollo.user({id: parent.id}).links()
}

module.exports = {
  plants
}
