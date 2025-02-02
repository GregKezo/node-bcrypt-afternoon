module.exports = {
  dragonTreasure: async (req, res) => {
    const db = req.app.set('db')
    const result = await db.get_dragon_treasure(1)
    return res.status(200).send(result)
  },


  getUserTreasure: async (req, res) => {
    const db = req.app.set('db')
    const result = await db.get_user_treasure(req.session.user.id)
    res.status(200).send(result)
  },

  addUserTreasure: async (req, res) => {
    const { treasureURL } = req.body
    const { id } = req.session.user
    const db = req.app.set('db')

    let userTreasure = await db.add_user_treasure([treasureURL, id])

    res.status(200).send(userTreasure)
  },

  getAllTreasure: async (req, res) => {
    const db = req.app.set('db')
    const allTreasure = await db.get_all_treasure();
    return res.status(200).send(allTreasure)

  }

}