function links(parent, args, context) {
  // plants
  return context.prisma.user({id: parent.id}).links()
}

module.exports = {
  links
}
